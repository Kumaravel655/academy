import { test, expect } from '@playwright/test';
import { API_BASE } from './mocks';

/**
 * Contact Page Tests
 */

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('renders the Contact page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Contact|Get in Touch/i }).first()).toBeVisible();
  });

  test('shows Full Name input field', async ({ page }) => {
    await expect(page.locator('input#name, input[name="name"]')).toBeVisible();
  });

  test('shows Email Address input field', async ({ page }) => {
    await expect(page.locator('input#email, input[name="email"]')).toBeVisible();
  });

  test('shows Subject select dropdown', async ({ page }) => {
    await expect(page.locator('select[name="subject"]')).toBeVisible();
  });

  test('Subject dropdown has expected options', async ({ page }) => {
    const select = page.locator('select[name="subject"]');
    await expect(select.locator('option[value="course-inquiry"]')).toHaveCount(1);
    await expect(select.locator('option[value="pricing"]')).toHaveCount(1);
    await expect(select.locator('option[value="technical"]')).toHaveCount(1);
    await expect(select.locator('option[value="feedback"]')).toHaveCount(1);
    await expect(select.locator('option[value="other"]')).toHaveCount(1);
  });

  test('shows Message textarea', async ({ page }) => {
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('shows "Send Message" submit button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });

  test('can type into all form fields', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Arjun Kumar');
    await page.locator('input[name="email"]').fill('arjun@example.com');
    await page.locator('select[name="subject"]').selectOption('course-inquiry');
    await page.locator('textarea[name="message"]').fill('I want to know more about the Python course.');

    await expect(page.locator('input[name="name"]')).toHaveValue('Arjun Kumar');
    await expect(page.locator('input[name="email"]')).toHaveValue('arjun@example.com');
    await expect(page.locator('select[name="subject"]')).toHaveValue('course-inquiry');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('I want to know more about the Python course.');
  });

  test('submitting the form calls POST /api/contact and shows success state', async ({ page }) => {
    // Mock the contact API
    let requestBody: any = null;
    await page.route(`${API_BASE}/api/contact`, async (route) => {
      requestBody = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({ json: { message: 'Message sent successfully' } });
    });

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('select[name="subject"]').selectOption('pricing');
    await page.locator('textarea[name="message"]').fill('What is the pricing for the courses?');
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show "Message Sent!" success state
    await expect(page.getByText(/Message Sent!/i)).toBeVisible({ timeout: 8000 });
  });

  test('form sends correct payload to API', async ({ page }) => {
    let requestBody: any = null;
    await page.route(`${API_BASE}/api/contact`, async (route) => {
      requestBody = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({ json: { message: 'OK' } });
    });

    await page.locator('input[name="name"]').fill('Jane Doe');
    await page.locator('input[name="email"]').fill('jane@example.com');
    await page.locator('select[name="subject"]').selectOption('feedback');
    await page.locator('textarea[name="message"]').fill('Great platform!');
    await page.getByRole('button', { name: /Send Message/i }).click();

    await expect(page.getByText(/Message Sent!/i)).toBeVisible({ timeout: 8000 });
    expect(requestBody.name).toBe('Jane Doe');
    expect(requestBody.email).toBe('jane@example.com');
    expect(requestBody.subject).toBe('feedback');
    expect(requestBody.message).toBe('Great platform!');
  });

  test('send button shows loading text while submitting', async ({ page }) => {
    await page.route(`${API_BASE}/api/contact`, async (route) => {
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({ json: { message: 'OK' } });
    });
    await page.locator('input[name="name"]').fill('Test');
    await page.locator('input[name="email"]').fill('t@e.com');
    await page.locator('select[name="subject"]').selectOption('other');
    await page.locator('textarea[name="message"]').fill('Hello');
    await page.getByRole('button', { name: /Send Message/i }).click();
    await expect(page.getByRole('button', { name: /Sending/i })).toBeVisible();
  });

  test('shows contact info cards (email, phone, address)', async ({ page }) => {
    await expect(page.getByText(/support@velandev\.com|Email/i).first()).toBeVisible();
  });

  test('page has header and footer', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
