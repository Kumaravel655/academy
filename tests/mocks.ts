import { Page } from '@playwright/test';

export const API_BASE = 'http://localhost:4566';

// ── Shared mock data (snake_case as FastAPI returns) ─────────────────────────

export const mockUser = {
  id: 1,
  email: 'demo@velandev.com',
  name: 'Demo User',
  is_admin: false,
  created_at: '2024-01-01T00:00:00',
};

export const mockAdminUser = {
  id: 2,
  email: 'admin@velandev.com',
  name: 'Admin User',
  is_admin: true,
  created_at: '2024-01-01T00:00:00',
};

export const mockCourse1 = {
  id: 1,
  slug: 'python-beginners',
  title: 'Python for Beginners',
  description: 'Learn Python programming from scratch',
  long_description: 'Comprehensive Python course for beginners covering all fundamentals.',
  instructor: 'Rajesh Kumar',
  instructor_bio: 'Senior Python developer with 10+ years experience',
  instructor_image: '',
  category: 'Python',
  level: 'Beginner',
  price: 4999,
  original_price: 9999,
  rating: 4.8,
  students: 2450,
  duration: '8 weeks',
  lessons: 32,
  image: '',
  curriculum: [
    {
      id: 'module-1',
      title: 'Python Basics & Setup',
      lessons: [
        { id: 'l1', title: 'Introduction to Python', duration: '25 min' },
        { id: 'l2', title: 'Installing Python', duration: '15 min' },
      ],
    },
  ],
  outcomes: [
    'Understand Python fundamentals',
    'Write and debug Python programs',
  ],
  testimonials: [
    {
      id: 1,
      name: 'Arjun Patel',
      rating: 5,
      comment: 'Excellent course, highly recommend!',
      role: 'Student',
      course_id: 1,
    },
  ],
  tags: ['python', 'programming'],
  created_at: '2024-01-01T00:00:00',
};

export const mockCourse2 = {
  id: 2,
  slug: 'web-development-bootcamp',
  title: 'Web Development Bootcamp',
  description: 'Full-stack web development course',
  long_description: 'Master HTML, CSS, JavaScript and more',
  instructor: 'Priya Sharma',
  instructor_bio: 'Full-stack developer with 8 years experience',
  instructor_image: '',
  category: 'Web Development',
  level: 'Intermediate',
  price: 5999,
  original_price: 11999,
  rating: 4.7,
  students: 1800,
  duration: '12 weeks',
  lessons: 48,
  image: '',
  curriculum: [
    {
      id: 'module-1',
      title: 'HTML & CSS Fundamentals',
      lessons: [
        { id: 'l1', title: 'Introduction to HTML', duration: '30 min' },
      ],
    },
  ],
  outcomes: ['Build full-stack web apps'],
  testimonials: [],
  tags: ['web', 'html', 'css', 'javascript'],
  created_at: '2024-01-02T00:00:00',
};

export const mockCourses = [mockCourse1, mockCourse2];

// ── Route setup helpers ───────────────────────────────────────────────────────

/**
 * Set up all public API mocks (courses list + detail + contact).
 * Uses a single regex handler to cover both /api/courses (list)
 * and /api/courses/:slug (detail).
 */
export async function setupPublicApis(page: Page) {
  // Handle all /api/courses* requests
  await page.route(/localhost:4566\/api\/courses/, async (route) => {
    const url = route.request().url();
    const slugMatch = url.match(/\/api\/courses\/([^?/]+)/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const course = mockCourses.find((c) => c.slug === slug);
      if (course) {
        await route.fulfill({ json: course });
      } else {
        await route.fulfill({ status: 404, json: { detail: 'Not found' } });
      }
    } else {
      // List endpoint (with or without query params)
      await route.fulfill({ json: mockCourses });
    }
  });

  // Contact form
  await page.route(`${API_BASE}/api/contact`, async (route) => {
    await route.fulfill({ json: { message: 'Message sent successfully' } });
  });
}

/**
 * Add a JWT token to localStorage before page load so auth context
 * hydrates as logged-in, and mock /api/auth/me to return a regular user.
 */
export async function setupAuthAsUser(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('token', 'test-user-token-123');
  });
  await page.route(`${API_BASE}/api/auth/me`, async (route) => {
    await route.fulfill({ json: mockUser });
  });
  await page.route(`${API_BASE}/api/enrollments`, async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        json: [
          {
            id: 1,
            course_id: 1,
            user_id: 1,
            enrolled_at: '2024-01-15T00:00:00',
            progress: 40,
            completed: false,
          },
        ],
      });
    } else {
      await route.fulfill({ json: { message: 'Updated' } });
    }
  });
  await page.route(`${API_BASE}/api/wishlist`, async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: [] });
    } else {
      await route.fulfill({ json: { message: 'Updated' } });
    }
  });
}

/**
 * Set up auth mocks for an admin user.
 */
export async function setupAuthAsAdmin(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('token', 'test-admin-token-123');
  });
  await page.route(`${API_BASE}/api/auth/me`, async (route) => {
    await route.fulfill({ json: mockAdminUser });
  });
  await page.route(`${API_BASE}/api/enrollments`, async (route) => {
    await route.fulfill({ json: [] });
  });
  await page.route(`${API_BASE}/api/wishlist`, async (route) => {
    await route.fulfill({ json: [] });
  });
}
