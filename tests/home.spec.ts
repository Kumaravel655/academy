import { test, expect } from '@playwright/test';

/**
 * Home Page Tests
 * The home page is SSR with fallback to static course data (lib/courses-data.ts)
 * so it renders even without the backend running.
 */

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads and has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sunshine Academy/i);
  });

  test('shows announcement bar with offer text', async ({ page }) => {
    await expect(page.getByText(/New Courses Available/i)).toBeVisible();
    await expect(page.getByText(/40% Off/i)).toBeVisible();
  });

  test('hero section is visible with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/Transform Your/i)).toBeVisible();
  });

  test('"Explore Courses" button is visible and navigates to /courses', async ({ page }) => {
    const exploreBtn = page.getByRole('link', { name: /Explore Courses/i }).first();
    await expect(exploreBtn).toBeVisible();
    await exploreBtn.click();
    await expect(page).toHaveURL('/courses');
  });

  test('"Watch Demo" button opens YouTube video modal', async ({ page }) => {
    await page.getByText('Watch Demo').click();
    await expect(page.locator('iframe[src*="youtube"]')).toBeVisible();
  });

  test('video modal can be closed by clicking the X button', async ({ page }) => {
    await page.getByText('Watch Demo').click();
    await expect(page.locator('iframe[src*="youtube"]')).toBeVisible();
    // The close button is the only button inside the fixed modal overlay
    await page.locator('.fixed button').first().click();
    await expect(page.locator('iframe[src*="youtube"]')).not.toBeVisible();
  });

  test('video modal can be closed by clicking the overlay background', async ({ page }) => {
    await page.getByText('Watch Demo').click();
    await expect(page.locator('iframe[src*="youtube"]')).toBeVisible();
    // Click the fixed backdrop element at top-left (outside centered modal content)
    await page.locator('.fixed.inset-0').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('iframe[src*="youtube"]')).not.toBeVisible();
  });

  test('clicking the video thumbnail on the right also opens the video modal', async ({ page }) => {
    // The right-side thumbnail card has a Play button and opens the modal on click
    await page.locator('[class*="cursor-pointer"]:has(svg):has-text("Watch Our Story")').first().click();
    await expect(page.locator('iframe[src*="youtube"]')).toBeVisible();
    // Cleanup
    await page.mouse.click(10, 10);
  });

  test('hero quick stats show 2,500+ students', async ({ page }) => {
    await expect(page.getByText('2,500+').first()).toBeVisible();
  });

  test('hero quick stats show 4.8★ rating', async ({ page }) => {
    await expect(page.getByText('4.8').first()).toBeVisible();
  });

  test('shows Featured Courses section with course cards', async ({ page }) => {
    // Course cards link to /courses/:slug
    await expect(page.locator('a[href*="/courses/"]').first()).toBeVisible();
  });

  test('"View All Courses" button navigates to /courses', async ({ page }) => {
    await page.getByRole('link', { name: /View All Courses/i }).first().click();
    await expect(page).toHaveURL('/courses');
  });

  test('"Browse Courses" CTA button navigates to /courses', async ({ page }) => {
    await page.getByRole('link', { name: /Browse Courses/i }).first().click();
    await expect(page).toHaveURL('/courses');
  });

  test('"Contact Us" CTA button navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: /Contact Us/i }).first().click();
    await expect(page).toHaveURL('/contact');
  });

  test('stats section shows key numbers', async ({ page }) => {
    await expect(page.getByText('2,500+').first()).toBeVisible();
    await expect(page.getByText('50+').first()).toBeVisible();
    await expect(page.getByText('95%').first()).toBeVisible();
  });

  test('footer is rendered', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('page has no broken layout - header and footer are both present', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
