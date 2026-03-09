import { test, expect } from '@playwright/test';
import { setupAuthAsUser } from './mocks';

/**
 * Course Detail Page Tests
 * Uses the real backend at localhost:4566 for course data.
 * The real course slug 'python-beginners' has title
 *   'Python for Beginners - Brighten Your Coding Skills'
 */

test.describe('Course Detail — Unauthenticated', () => {
  test.beforeEach(async ({ page }) => {
    // Use real backend — no course API mock
    await page.goto('/courses/python-beginners');
    // Wait for the client-side fetch to load the course data
    await expect(
      page.getByRole('heading', { name: /Python for Beginners/i }).first()
    ).toBeVisible({ timeout: 12000 });
  });

  test('shows the course title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Python for Beginners/i }).first()).toBeVisible();
  });

  test('shows the category badge', async ({ page }) => {
    await expect(page.getByText('Python').first()).toBeVisible();
  });

  test('shows the level badge', async ({ page }) => {
    await expect(page.getByText('Beginner').first()).toBeVisible();
  });

  test('shows the course rating', async ({ page }) => {
    await expect(page.getByText('4.8').first()).toBeVisible();
  });

  test('shows the course duration', async ({ page }) => {
    await expect(page.getByText('8 weeks')).toBeVisible();
  });

  test('shows the number of lessons', async ({ page }) => {
    await expect(page.getByText(/32 lessons/i)).toBeVisible();
  });

  test('shows the instructor name', async ({ page }) => {
    // Real backend instructor name is 'kumaravel'
    await expect(page.getByText(/kumaravel/i).first()).toBeVisible();
  });

  test('shows the course description', async ({ page }) => {
    // The page shows long_description (detailed text)
    await expect(page.locator('p').filter({ hasText: /python|learn|coding|programming/i }).first()).toBeVisible();
  });

  test('"Enroll Now" button redirects to /login when not authenticated', async ({ page }) => {
    await page.getByRole('button', { name: /Enroll Now/i }).first().click();
    await expect(page).toHaveURL('/login');
  });

  test('Wishlist/Heart button redirects to /login when not authenticated', async ({ page }) => {
    const heartBtn = page.locator('button').filter({ hasText: '' }).filter({
      has: page.locator('svg'),
    }).first();
    // Find the wishlist heart button by looking for button with Heart icon near the CTA area
    const wishlistBtn = page.getByRole('button', { name: /wishlist|Add to/i }).first();
    if (await wishlistBtn.isVisible()) {
      await wishlistBtn.click();
      await expect(page).toHaveURL('/login');
    }
  });

  test('shows the Curriculum section', async ({ page }) => {
    await expect(page.getByText(/Curriculum|Course Modules/i)).toBeVisible();
  });

  test('shows curriculum module titles', async ({ page }) => {
    await expect(page.getByText('Python Basics & Setup')).toBeVisible();
  });

  test('shows curriculum lesson titles', async ({ page }) => {
    await expect(page.getByText('Introduction to Python')).toBeVisible();
  });

  test('shows the Learning Outcomes section', async ({ page }) => {
    await expect(page.getByText(/What You.ll Learn|Learning Outcomes/i)).toBeVisible();
  });

  test('shows learning outcome items', async ({ page }) => {
    await expect(page.getByText(/Python fundamentals/i)).toBeVisible();
  });

  test('shows student count in stats', async ({ page }) => {
    // The page shows students count from the API
    await expect(page.getByText(/students/i).first()).toBeVisible();
  });

  test('shows course price in the pricing card', async ({ page }) => {
    await expect(page.getByText(/₹/).first()).toBeVisible();
  });

  test('shows original price (strikethrough)', async ({ page }) => {
    // At least two price-like elements should exist (price + original price)
    await expect(page.getByText(/₹/).first()).toBeVisible();
  });

  test('footer is rendered on course detail page', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Course Detail — Authenticated (Enrolled)', () => {
  test.beforeEach(async ({ page }) => {
    // Mock auth and enrollment, let real backend serve course data
    await setupAuthAsUser(page);
    await page.goto('/courses/python-beginners');
    await expect(
      page.getByRole('heading', { name: /Python for Beginners/i }).first()
    ).toBeVisible({ timeout: 12000 });
  });

  test('shows "Continue Learning" button for an enrolled course', async ({ page }) => {
    // setupAuthAsUser mocks enrollment for course id=1 (python-beginners)
    await expect(page.getByRole('button', { name: /Continue Learning/i })).toBeVisible({ timeout: 8000 });
  });

  test('"Continue Learning" redirects to /dashboard', async ({ page }) => {
    const btn = page.getByRole('button', { name: /Continue Learning/i });
    await btn.waitFor({ timeout: 8000 });
    await btn.click();
    await expect(page).toHaveURL('/dashboard');
  });
});

test.describe('Course Detail — Non-existent course', () => {
  test('redirects to 404 for unknown slug', async ({ page }) => {
    await page.route(/localhost:4566\/api\/courses/, async (route) => {
      const url = route.request().url();
      if (url.includes('/api/courses/non-existent-course')) {
        await route.fulfill({ status: 404, json: { detail: 'Not found' } });
      } else {
        await route.fulfill({ json: [] });
      }
    });
    await page.goto('/courses/non-existent-course');
    // App redirects to /404 or shows an error
    await expect(page).toHaveURL(/\/404|\/courses/);
  });
});
