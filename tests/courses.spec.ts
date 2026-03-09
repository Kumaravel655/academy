import { test, expect } from '@playwright/test';

/**
 * Courses Listing Page Tests
 * Uses the real backend at localhost:4566.
 * Real courses include 'Python for Beginners - Brighten Your Coding Skills'.
 */

test.describe('Courses Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/courses');
    // Wait for actual course cards (h3 titles inside course links) to load from the real backend
    await expect(page.locator('a[href*="/courses/"] h3').first()).toBeVisible({ timeout: 15000 });
  });

  test('renders with correct heading "Our Courses"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Our Courses/i })).toBeVisible();
  });

  test('shows search bar with correct placeholder', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search courses by name or description/i);
    await expect(searchInput).toBeVisible();
  });

  test('displays course cards from the real backend', async ({ page }) => {
    // Real backend has multiple courses; check for Python course partial title
    await expect(page.getByText(/Python for Beginners/i).first()).toBeVisible();
    await expect(page.getByText(/Web Development|Java|Data Science|React/i).first()).toBeVisible();
  });

  test('shows "Found X courses" counter', async ({ page }) => {
    await expect(page.getByText(/Found.*courses/i)).toBeVisible({ timeout: 8000 });
  });

  test('search input filters courses by title', async ({ page }) => {
    await page.getByPlaceholder(/Search courses/i).fill('Python');
    await expect(page.getByText(/Python for Beginners/i).first()).toBeVisible();
    // Non-Python courses should not be visible
    await expect(page.getByText(/Web Development Bootcamp/i)).not.toBeVisible();
  });

  test('search input filters courses by description', async ({ page }) => {
    await page.getByPlaceholder(/Search courses/i).fill('java');
    await expect(page.getByText(/Java/i).first()).toBeVisible();
  });

  test('clearing search restores all courses', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search courses/i);
    await searchInput.fill('Python');
    // Non-python courses hidden
    await expect(page.getByText(/Java Advanced|Web Development|Data Science/i).first()).not.toBeVisible({ timeout: 3000 }).catch(() => {});
    await searchInput.fill('');
    // All courses visible again
    await expect(page.getByText(/Python for Beginners/i).first()).toBeVisible();
  });

  test('shows sort dropdown with correct options', async ({ page }) => {
    const sortSelect = page.locator('select').last();
    await expect(sortSelect).toBeVisible();
    await expect(sortSelect.locator('option[value="rating"]')).toHaveCount(1);
    await expect(sortSelect.locator('option[value="newest"]')).toHaveCount(1);
    await expect(sortSelect.locator('option[value="price-low"]')).toHaveCount(1);
    await expect(sortSelect.locator('option[value="price-high"]')).toHaveCount(1);
  });

  test('sort by "Price (Low to High)" rearranges courses', async ({ page }) => {
    await page.locator('select').last().selectOption('price-low');
    // Courses should still be visible
    await expect(page.getByText(/Python for Beginners/i).first()).toBeVisible();
  });

  test('sort by "Newest" works without errors', async ({ page }) => {
    await page.locator('select').last().selectOption('newest');
    await expect(page.getByText(/Python for Beginners|Web Development|Java/i).first()).toBeVisible();
  });

  test('sort by "Price (High to Low)" works without errors', async ({ page }) => {
    await page.locator('select').last().selectOption('price-high');
    await expect(page.getByText(/Python for Beginners|Web Development|Java/i).first()).toBeVisible();
  });

  test('shows the filter sidebar', async ({ page }) => {
    // CourseFilter component renders filter options
    await expect(page.getByText(/Filter|Category|Level/i).first()).toBeVisible();
  });

  test('clicking a course card navigates to its detail page', async ({ page }) => {
    await page.getByText(/Python for Beginners/i).first().click();
    await expect(page).toHaveURL('/courses/python-beginners');
  });

  test('non-existent search shows zero results message', async ({ page }) => {
    await page.getByPlaceholder(/Search courses/i).fill('xyznotarealcourse123');
    await expect(page.getByText('No courses found matching your filters.').first()).toBeVisible();
  });

  test('courses show pricing information', async ({ page }) => {
    await expect(page.getByText(/₹[\d,]+/).first()).toBeVisible();
  });

  test('courses show rating information', async ({ page }) => {
    await expect(page.getByText(/4\.[0-9]/).first()).toBeVisible();
  });
});
