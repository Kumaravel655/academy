'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import {
  BarChart3,
  BookOpen,
  Users,
  TrendingUp,
  Trash2,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Shield,
  Loader2,
  Pencil,
} from 'lucide-react';

interface CourseFormData {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorBio: string;
  instructorImage: string;
  category: string;
  level: string;
  price: string;
  originalPrice: string;
  duration: string;
  lessons: string;
  image: string;
  tags: string;
}

const emptyForm: CourseFormData = {
  title: '',
  slug: '',
  description: '',
  longDescription: '',
  instructor: '',
  instructorBio: '',
  instructorImage: '',
  category: 'Programming',
  level: 'Beginner',
  price: '',
  originalPrice: '',
  duration: '',
  lessons: '',
  image: '',
  tags: '',
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CourseFormData>(emptyForm);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Auth guard – redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !user?.isAdmin)) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, user, router]);

  // Fetch courses
  const fetchCourses = () => {
    api.courses.list().then(setCourses).catch(console.error);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim(),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.title.trim()) return setFormError('Title is required');
    if (!formData.slug.trim()) return setFormError('Slug is required');
    if (!formData.description.trim()) return setFormError('Description is required');
    if (!formData.instructor.trim()) return setFormError('Instructor name is required');
    if (!formData.price) return setFormError('Price is required');
    if (!formData.duration.trim()) return setFormError('Duration is required');

    setSubmitting(true);
    try {
      const payload: any = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDescription: formData.longDescription || formData.description,
        instructor: formData.instructor,
        instructorBio: formData.instructorBio || `Expert instructor specializing in ${formData.category}`,
        instructorImage: formData.instructorImage,
        category: formData.category,
        level: formData.level,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        duration: formData.duration,
        lessons: formData.lessons ? parseInt(formData.lessons) : 0,
        image: formData.image,
        tags: formData.tags
          ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
      };

      if (editingCourseId) {
        await api.courses.update(editingCourseId, payload);
        setFormSuccess('Course updated successfully!');
      } else {
        payload.rating = 0;
        payload.students = 0;
        payload.curriculum = [];
        payload.outcomes = [];
        payload.testimonials = [];
        payload.faq = [];
        await api.courses.create(payload);
        setFormSuccess('Course created successfully!');
      }
      setFormData(emptyForm);
      fetchCourses();
      setTimeout(() => {
        setShowForm(false);
        setEditingCourseId(null);
        setFormSuccess('');
      }, 1500);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : editingCourseId ? 'Failed to update course' : 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (courseId: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    setDeleting(courseId);
    try {
      await api.courses.delete(courseId);
      fetchCourses();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete course');
    } finally {
      setDeleting(null);
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <main>
        <Header />
        <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="text-foreground mt-4 font-medium">Verifying admin access...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) return null;

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      title: 'Total Students',
      value: courses.reduce((sum: number, c: any) => sum + (c.students || 0), 0).toLocaleString(),
      icon: Users,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950/50',
    },
    {
      title: 'Average Rating',
      value:
        courses.length > 0
          ? (courses.reduce((sum: number, c: any) => sum + (c.rating || 0), 0) / courses.length).toFixed(2)
          : '0.00',
      icon: TrendingUp,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-950/50',
    },
    {
      title: 'Total Revenue',
      value: `₹${(courses.reduce((sum: number, c: any) => sum + (c.price || 0) * 100, 0) / 100000).toFixed(0)}k`,
      icon: BarChart3,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-950/50',
    },
  ];

  return (
    <main>
      <Header />

      {/* Admin Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900/60 to-slate-900 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Shield size={20} className="text-purple-300" />
            </div>
            <span className="text-purple-300 font-medium text-sm uppercase tracking-wider">
              Admin Panel
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Admin Dashboard
          </h1>
          <p className="text-lg text-white/70">
            Manage courses, monitor students, and control your academy
          </p>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 -mt-16 relative z-20">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-6 shadow-premium hover-lift transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </h3>
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon size={20} className={stat.color} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Course Management</h2>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingCourseId(null);
                setFormData(emptyForm);
                setFormError('');
                setFormSuccess('');
              }}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white gap-2 rounded-xl shadow-lg"
            >
              <Plus size={18} />
              Add New Course
            </Button>
          </div>

          {/* ────────── Add Course Modal ────────── */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl w-full max-w-2xl shadow-premium-lg mb-20">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {editingCourseId ? <Pencil size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                    {editingCourseId ? 'Edit Course' : 'Add New Course'}
                  </h3>
                  <button
                    onClick={() => { setShowForm(false); setEditingCourseId(null); }}
                    className="p-2 hover:bg-muted rounded-xl transition-colors"
                  >
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {formError && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                      <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-red-700 dark:text-red-400 text-sm">{formError}</p>
                    </div>
                  )}
                  {formSuccess && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-3">
                      <CheckCircle size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p className="text-emerald-700 dark:text-emerald-400 text-sm">{formSuccess}</p>
                    </div>
                  )}

                  {/* Title + Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Course Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Python for Beginners"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="python-for-beginners"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Brief description shown on course cards"
                      className="w-full bg-slate-50 dark:bg-gray-700 border border-border/60 rounded-xl px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {/* Long Description */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Full Description
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Detailed course description for the course page"
                      className="w-full bg-slate-50 dark:bg-gray-700 border border-border/60 rounded-xl px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {/* Instructor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Instructor Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        placeholder="Dr. John Doe"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Instructor Bio
                      </label>
                      <Input
                        name="instructorBio"
                        value={formData.instructorBio}
                        onChange={handleChange}
                        placeholder="Senior developer with 10+ years experience"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                  </div>

                  {/* Category + Level */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-gray-700 border border-border/60 rounded-xl h-11 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="Programming">Programming</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Design">Design</option>
                        <option value="AI & ML">AI &amp; ML</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-gray-700 border border-border/60 rounded-xl h-11 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Price + Original Price + Lessons */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="4999"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Original Price (₹)
                      </label>
                      <Input
                        name="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        placeholder="7999"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Lessons Count
                      </label>
                      <Input
                        name="lessons"
                        type="number"
                        value={formData.lessons}
                        onChange={handleChange}
                        placeholder="42"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                  </div>

                  {/* Duration + Image */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="24 hours"
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Image URL
                      </label>
                      <Input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Tags (comma-separated)
                    </label>
                    <Input
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="python, programming, beginner"
                      className="bg-slate-50 dark:bg-gray-700 border-border/60 rounded-xl h-11"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => { setShowForm(false); setEditingCourseId(null); }}
                      className="flex-1 rounded-xl h-11 border-border/60"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl h-11 shadow-lg"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          {editingCourseId ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          {editingCourseId ? <Pencil size={18} className="mr-2" /> : <Plus size={18} className="mr-2" />}
                          {editingCourseId ? 'Update Course' : 'Create Course'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ────────── Courses Table ────────── */}
          <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 dark:bg-gray-700/50 border-b border-border/60">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Course</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Level</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Students</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                        No courses yet. Click &quot;Add New Course&quot; to get started.
                      </td>
                    </tr>
                  )}
                  {courses.map((course: any) => (
                    <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{course.title}</p>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                          {course.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                          course.level === 'Beginner'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                            : course.level === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                        }`}>
                          {course.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{(course.students || 0).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-yellow-500 font-semibold">{course.rating || 0}⭐</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">₹{course.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingCourseId(parseInt(course.id));
                              setFormData({
                                title: course.title || '',
                                slug: course.slug || '',
                                description: course.description || '',
                                longDescription: course.longDescription || '',
                                instructor: course.instructor || '',
                                instructorBio: course.instructorBio || '',
                                instructorImage: course.instructorImage || '',
                                category: course.category || 'Programming',
                                level: course.level || 'Beginner',
                                price: course.price != null ? String(course.price) : '',
                                originalPrice: course.originalPrice != null ? String(course.originalPrice) : '',
                                duration: course.duration || '',
                                lessons: course.lessons != null ? String(course.lessons) : '',
                                image: course.image || '',
                                tags: Array.isArray(course.tags) ? course.tags.join(', ') : '',
                              });
                              setFormError('');
                              setFormSuccess('');
                              setShowForm(true);
                            }}
                            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl text-muted-foreground hover:text-blue-500 transition-colors"
                            title="Edit course"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(parseInt(course.id))}
                            disabled={deleting === parseInt(course.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                            title="Delete course"
                          >
                            {deleting === parseInt(course.id) ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admin Info */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-primary/5 dark:from-purple-950/30 dark:to-primary/10 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-purple-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Admin Access — {user.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Logged in as <strong>{user.email}</strong>. You can add, edit, and delete courses.
                  Changes will immediately appear on the public courses page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
