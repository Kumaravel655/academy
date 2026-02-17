'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  Users,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';
import { courses } from '@/lib/courses-data';

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'text-blue-500',
    },
    {
      title: 'Total Students',
      value: courses.reduce((sum, c) => sum + c.students, 0).toLocaleString(),
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Average Rating',
      value: (
        (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(2)
      ),
      icon: TrendingUp,
      color: 'text-yellow-500',
    },
    {
      title: 'Total Revenue',
      value: `₹${(courses.reduce((sum, c) => sum + c.price * 100, 0) / 100000).toFixed(0)}k`,
      icon: BarChart3,
      color: 'text-purple-500',
    },
  ];

  return (
    <main>
      <Header />

      <section className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage courses, instructors, and monitor student progress
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={18} />
              Add New Course
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </h3>
                    <Icon size={24} className={`${stat.color} opacity-50`} />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Courses Management */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-background/50 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                Course Management
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-background/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {course.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            by {course.instructor}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {course.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {course.students.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-yellow-500 font-semibold">
                          {course.rating}⭐
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">
                        ₹{course.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-background rounded-lg text-muted-foreground hover:text-primary transition-colors">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 hover:bg-background rounded-lg text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">
              Demo Mode - Admin Dashboard
            </h3>
            <p className="text-muted-foreground text-sm">
              This admin dashboard is in demo mode. In a production environment, you would be
              able to edit courses, manage instructors, track student progress, view analytics,
              and handle enrollment confirmations. The functionality would be connected to a
              real database backend.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
