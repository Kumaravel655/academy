import { test, expect } from '@playwright/test';
import { setupAuthAsAdmin, API_BASE, mockCourse1, mockCourse2, mockCourses } from './mocks';

/**
 * Admin Dashboard Page Tests
 */

async function setupAdminWithCourses(page: any) {
  await setupAuthAsAdmin(page);
  // Admin stats
  await page.route(`${API_BASE}/api/admin/stats`, async (route: any) => {
    await route.fulfill({
      json: {
        total_courses: 2,
        total_students: 4250,
        average_rating: 4.75,
        total_revenue: 21996,
      },
    });
  });
  await page.route(`${API_BASE}/api/admin/instructors`, async (route: any) => {
    await route.fulfill({ json: [] });
  });
  // Courses CRUD
  await page.route(/localhost:4566\/api\/courses/, async (route: any) => {
    const method = route.request().method();
    const url = route.request().url();
    const idMatch = url.match(/\/api\/courses\/(\d+)/);
    if (idMatch && method === 'DELETE') {
      await route.fulfill({ json: { message: 'Deleted' } });
    } else if (idMatch && (method === 'PUT' || method === 'PATCH')) {
      const body = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({ json: { ...mockCourse1, ...body, id: parseInt(idMatch[1]) } });
    } else if (!idMatch && method === 'POST') {
      const body = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({
        status: 201,
        json: { ...body, id: 99, rating: 0, students: 0 },
      });
    } else {
      await route.fulfill({ json: mockCourses });
    }
  });
}

test.describe('Admin Page — Unauthenticated Redirect', () => {
  test('redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Admin Page — Regular User Redirect', () => {
  test('redirects non-admin user to /login', async ({ page }) => {
    const { mockUser } = await import('./mocks');
    await page.addInitScript(() => localStorage.setItem('token', 'user-token'));
    await page.route(`${API_BASE}/api/auth/me`, async (route) => {
      await route.fulfill({ json: mockUser }); // is_admin: false
    });
    await page.route(`${API_BASE}/api/enrollments`, async (route) => {
      await route.fulfill({ json: [] });
    });
    await page.route(`${API_BASE}/api/wishlist`, async (route) => {
      await route.fulfill({ json: [] });
    });
    await page.route(/localhost:4566\/api\/courses/, async (route) => {
      await route.fulfill({ json: [] });
    });

    await page.goto('/admin');
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Admin Dashboard — Authenticated Admin', () => {
  test.beforeEach(async ({ page }) => {
    await setupAdminWithCourses(page);
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible({
      timeout: 12000,
    });
  });

  // ── Stats Cards ─────────────────────────────────────────────────────────────

  test('shows Total Courses stat card', async ({ page }) => {
    await expect(page.getByText(/Total Courses/i)).toBeVisible();
  });

  test('shows Total Students stat card', async ({ page }) => {
    await expect(page.getByText(/Total Students/i)).toBeVisible();
  });

  test('shows Average Rating stat card', async ({ page }) => {
    await expect(page.getByText(/Average Rating/i)).toBeVisible();
  });

  test('shows Total Revenue stat card', async ({ page }) => {
    await expect(page.getByText(/Total Revenue/i)).toBeVisible();
  });

  // ── Course Management Table ──────────────────────────────────────────────────

  test('shows Course Management heading', async ({ page }) => {
    await expect(page.getByText(/Course Management/i)).toBeVisible();
  });

  test('shows "Add New Course" button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Add New Course/i })).toBeVisible();
  });

  test('renders the courses table with columns', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: /Course/i })).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole('columnheader', { name: /Category/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Level/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Price/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Actions/i })).toBeVisible();
  });

  test('table shows existing course rows', async ({ page }) => {
    await expect(page.getByText('Python for Beginners').first()).toBeVisible({ timeout: 8000 });
    await expect(page.getByText('Web Development Bootcamp').first()).toBeVisible({ timeout: 8000 });
  });

  test('shows edit (pencil) and delete (trash) buttons for each course', async ({ page }) => {
    await expect(page.locator('button[title="Edit course"]').first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator('button[title="Delete course"]').first()).toBeVisible({ timeout: 8000 });
  });

  // ── Add New Course Modal ──────────────────────────────────────────────────────

  test('"Add New Course" opens the modal with the form', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    await expect(page.getByRole('heading', { name: /Add New Course/i })).toBeVisible();
  });

  test('modal shows all required form fields', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    await expect(page.getByPlaceholder(/e.g. Python for Beginners/i)).toBeVisible();
    await expect(page.getByPlaceholder(/python-for-beginners/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Brief description/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Dr. John Doe/i)).toBeVisible();
    await expect(page.getByPlaceholder('4999')).toBeVisible();
    await expect(page.getByPlaceholder('24 hours')).toBeVisible();
  });

  test('modal "×" button closes the modal', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    await expect(page.getByRole('heading', { name: /Add New Course/i })).toBeVisible();
    // The X close button inside the modal header
    await page.locator('.fixed button').filter({ has: page.locator('svg') }).first().click();
    await expect(page.getByRole('heading', { name: /Add New Course/i })).not.toBeVisible();
  });

  test('modal "Cancel" button closes the modal', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    await expect(page.getByRole('heading', { name: /Add New Course/i })).toBeVisible();
    await page.getByRole('button', { name: /^Cancel$/i }).click();
    await expect(page.getByRole('heading', { name: /Add New Course/i })).not.toBeVisible();
  });

  test('submitting empty form shows validation error', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    await page.getByRole('button', { name: /^Create Course$/i }).click();
    await expect(page.getByText(/Title is required/i)).toBeVisible();
  });

  test('title input auto-generates slug', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    await page.getByPlaceholder(/e.g. Python for Beginners/i).fill('React JS Masterclass');
    const slugInput = page.getByPlaceholder(/python-for-beginners/i);
    await expect(slugInput).toHaveValue('react-js-masterclass');
  });

  test('Category dropdown has correct options', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    const categorySelect = page.locator('select[name="category"]');
    await expect(categorySelect.locator('option[value="Programming"]')).toHaveCount(1);
    await expect(categorySelect.locator('option[value="Web Development"]')).toHaveCount(1);
    await expect(categorySelect.locator('option[value="Data Science"]')).toHaveCount(1);
    await expect(categorySelect.locator('option[value="AI & ML"]')).toHaveCount(1);
  });

  test('Level dropdown has Beginner, Intermediate, Advanced options', async ({ page }) => {
    await page.getByRole('button', { name: /Add New Course/i }).click();
    const levelSelect = page.locator('select[name="level"]');
    await expect(levelSelect.locator('option[value="Beginner"]')).toHaveCount(1);
    await expect(levelSelect.locator('option[value="Intermediate"]')).toHaveCount(1);
    await expect(levelSelect.locator('option[value="Advanced"]')).toHaveCount(1);
  });

  test('successfully submitting the "Add New Course" form calls POST /api/courses', async ({ page }) => {
    let postedPayload: any = null;
    await page.route(/localhost:4566\/api\/courses$/, async (route) => {
      if (route.request().method() === 'POST') {
        postedPayload = JSON.parse(route.request().postData() || '{}');
        await route.fulfill({
          status: 201,
          json: { ...postedPayload, id: 99, rating: 0, students: 0 },
        });
      } else {
        await route.fulfill({ json: mockCourses });
      }
    });

    await page.getByRole('button', { name: /Add New Course/i }).click();
    await page.getByPlaceholder(/e.g. Python for Beginners/i).fill('Test Course Title');
    await page.getByPlaceholder(/Brief description/i).fill('A short test description');
    await page.getByPlaceholder(/Dr. John Doe/i).fill('Test Instructor');
    await page.getByPlaceholder('4999').fill('3999');
    await page.getByPlaceholder('24 hours').fill('6 weeks');
    await page.getByRole('button', { name: /^Create Course$/i }).click();

    await expect(page.getByText(/Course created successfully/i)).toBeVisible({ timeout: 8000 });
    expect(postedPayload?.title).toBe('Test Course Title');
    expect(postedPayload?.instructor).toBe('Test Instructor');
  });

  // ── Edit Course ───────────────────────────────────────────────────────────────

  test('clicking Edit populates the form with existing course data', async ({ page }) => {
    await page.locator('button[title="Edit course"]').first().click();
    // The modal should open with "Edit Course" title
    await expect(page.getByRole('heading', { name: /Edit Course/i })).toBeVisible();
    // Title field should be pre-filled
    const titleInput = page.getByPlaceholder(/e.g. Python for Beginners/i);
    await expect(titleInput).toHaveValue('Python for Beginners');
  });

  test('editing a course calls PUT /api/courses/:id', async ({ page }) => {
    let updatedPayload: any = null;
    await page.route(/localhost:4566\/api\/courses\/1$/, async (route) => {
      if (['PUT', 'PATCH'].includes(route.request().method())) {
        updatedPayload = JSON.parse(route.request().postData() || '{}');
        await route.fulfill({ json: { ...mockCourse1, ...updatedPayload } });
      } else {
        await route.fulfill({ json: mockCourse1 });
      }
    });

    await page.locator('button[title="Edit course"]').first().click();
    await expect(page.getByRole('heading', { name: /Edit Course/i })).toBeVisible();

    // Update the title
    const titleInput = page.getByPlaceholder(/e.g. Python for Beginners/i);
    await titleInput.clear();
    await titleInput.fill('Python for Beginners Updated');
    await page.getByRole('button', { name: /^Update Course$/i }).click();

    await expect(page.getByText(/Course updated successfully/i)).toBeVisible({ timeout: 8000 });
    expect(updatedPayload?.title).toBe('Python for Beginners Updated');
  });

  // ── Delete Course ─────────────────────────────────────────────────────────────

  test('clicking Delete button triggers window.confirm dialog', async ({ page }) => {
    let confirmCalled = false;
    page.on('dialog', async (dialog) => {
      confirmCalled = true;
      await dialog.dismiss(); // Cancel the delete
    });

    await page.locator('button[title="Delete course"]').first().click();
    expect(confirmCalled).toBe(true);
  });

  test('confirming delete calls DELETE /api/courses/:id', async ({ page }) => {
    let deleteCalled = false;
    await page.route(/localhost:4566\/api\/courses\/\d+$/, async (route) => {
      if (route.request().method() === 'DELETE') {
        deleteCalled = true;
        await route.fulfill({ json: { message: 'Deleted' } });
      } else {
        await route.fulfill({ json: mockCourse1 });
      }
    });

    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.locator('button[title="Delete course"]').first().click();
    await page.waitForTimeout(500);
    expect(deleteCalled).toBe(true);
  });

  // ── Admin Info Card ───────────────────────────────────────────────────────────

  test('shows admin info box with logged-in admin email', async ({ page }) => {
    await expect(page.getByText('admin@velandev.com')).toBeVisible({ timeout: 8000 });
  });

  test('shows admin name in the info box', async ({ page }) => {
    await expect(page.getByText(/Admin User/i).first()).toBeVisible({ timeout: 8000 });
  });
});
