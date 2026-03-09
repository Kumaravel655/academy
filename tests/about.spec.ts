import { test, expect } from '@playwright/test';
import { API_BASE } from './mocks';

/**
 * About Page Tests
 */

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock instructors API
    await page.route(`${API_BASE}/api/admin/instructors`, async (route) => {
      await route.fulfill({
        json: [
          {
            id: 1,
            name: 'Rajesh Kumar',
            bio: 'Senior Python developer with 10+ years experience.',
            image: '',
            courses_count: 5,
            rating: 4.9,
          },
          {
            id: 2,
            name: 'Priya Sharma',
            bio: 'Full-stack developer and educator.',
            image: '',
            courses_count: 3,
            rating: 4.7,
          },
        ],
      });
    });
    await page.goto('/about');
  });

  test('renders about page with heading', async ({ page }) => {
    // The SSR page renders with static data even without API
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('shows Mission or Vision section', async ({ page }) => {
    await expect(page.getByText(/Mission|Vision/i).first()).toBeVisible();
  });

  test('shows stats including student count', async ({ page }) => {
    // Stats section shows '2500+' (no comma) for active students
    await expect(page.getByText('2500+').first()).toBeVisible();
  });

  test('shows "50+" courses offered stat', async ({ page }) => {
    await expect(page.getByText(/50\+/)).toBeVisible();
  });

  test('shows "4.8" average rating', async ({ page }) => {
    await expect(page.getByText(/4\.8/i)).toBeVisible();
  });

  test('shows Core Values section', async ({ page }) => {
    await expect(page.getByText(/Core Values|Our Values/i)).toBeVisible();
  });

  test('shows Instructors section', async ({ page }) => {
    // Heading text is 'Meet Our Instructors'
    await expect(page.getByText(/Meet Our.*Instructors/i).first()).toBeVisible();
  });

  test('displays instructor names', async ({ page }) => {
    await expect(page.getByText('Rajesh Kumar').first()).toBeVisible({ timeout: 8000 });
  });

  test('shows "Why Choose Sunshine Academy?" section', async ({ page }) => {
    // The actual heading text is 'Why Choose Sunshine Academy?'
    await expect(page.getByText(/Why Choose.*Sunshine Academy/i).first()).toBeVisible();
  });

  test('page has header and footer', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('page title includes "About"', async ({ page }) => {
    await expect(page).toHaveTitle(/About/i);
  });
});
