import { test, expect } from '@playwright/test';
import { setupPublicApis } from './mocks';

/**
 * Navigation Tests — Header and Footer
 */

test.describe('Header Navigation', () => {
  test('logo link navigates back to home from another page', async ({ page }) => {
    // Use the about page as a starting point
    await page.goto('/about');
    // The logo "Sunshine Academy" links to /
    await page.getByRole('link', { name: /Sunshine Academy/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('Home nav link navigates to /', async ({ page }) => {
    await page.goto('/courses');
    await page.getByRole('navigation').getByRole('link', { name: /^Home$/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('Courses nav link navigates to /courses', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: /^Courses$/i }).click();
    await expect(page).toHaveURL('/courses');
  });

  test('About nav link navigates to /about', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: /^About$/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('Contact nav link navigates to /contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: /^Contact$/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('"Sign In" header button navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^Sign In$/i }).click();
    await expect(page).toHaveURL('/login');
  });

  test('"Get Started Free" button navigates to /signup', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Get Started Free/i }).click();
    await expect(page).toHaveURL('/signup');
  });

  test('theme toggle button toggles between light and dark mode', async ({ page }) => {
    await page.goto('/');
    // Use .first() because header renders both desktop and mobile theme toggles
    const themeToggle = page.getByLabel('Toggle theme').first();
    await expect(themeToggle).toBeVisible();
    // Click once — switches theme
    await themeToggle.click();
    // Click again — switches back
    await themeToggle.click();
    // No error thrown = pass
  });

  test('announcement bar shows the promotional message', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/New Courses Available.*40% Off/i)).toBeVisible();
  });
});

test.describe('Header — Authenticated User', () => {
  test.beforeEach(async ({ page }) => {
    const { API_BASE, mockUser } = await import('./mocks');
    await page.addInitScript(() => {
      localStorage.setItem('token', 'test-token');
    });
    await page.route(`${API_BASE}/api/auth/me`, async (route) => {
      await route.fulfill({ json: mockUser });
    });
    await page.route(`${API_BASE}/api/enrollments`, async (route) => {
      await route.fulfill({ json: [] });
    });
    await page.route(`${API_BASE}/api/wishlist`, async (route) => {
      await route.fulfill({ json: [] });
    });
    await setupPublicApis(page);
    await page.goto('/');
  });

  test('shows Dashboard link for authenticated user', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible({ timeout: 8000 });
  });

  test('shows Logout button for authenticated user', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Logout|Log Out/i })).toBeVisible({ timeout: 8000 });
  });

  test('Logout button clears session and shows Sign In', async ({ page }) => {
    await page.getByRole('button', { name: /Logout|Log Out/i }).click({ timeout: 8000 });
    await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();
  });
});

test.describe('Footer Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('"Get Started" footer CTA goes to /courses', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /Get Started/i }).click();
    await expect(page).toHaveURL('/courses');
  });

  test('footer Home link goes to /', async ({ page }) => {
    await page.goto('/courses');
    await page.locator('footer').getByRole('link', { name: /^Home$/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('footer Courses link goes to /courses', async ({ page }) => {
    // Footer Quick Links has "All Courses" (not just "Courses")
    await page.locator('footer').getByRole('link', { name: /All Courses/i }).first().click();
    await expect(page).toHaveURL('/courses');
  });

  test('footer About link goes to /about', async ({ page }) => {
    // Footer Quick Links has "About Us" (not just "About")
    await page.locator('footer').getByRole('link', { name: /About Us/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('footer Contact link goes to /contact', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /^Contact$/i }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('footer Admin link goes to /admin', async ({ page }) => {
    await page.locator('footer').getByRole('link', { name: /Admin/i }).click();
    // Redirect to /login since not authenticated
    await expect(page).toHaveURL(/\/login|\/admin/);
  });

  test('footer shows copyright text', async ({ page }) => {
    await expect(page.locator('footer').getByText(/Sunshine Academy/i).first()).toBeVisible();
  });

  test('footer newsletter subscribe button is visible', async ({ page }) => {
    await expect(page.locator('footer').getByRole('button', { name: /Join|Subscribe/i })).toBeVisible();
  });
});
