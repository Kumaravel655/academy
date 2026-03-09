import { test, expect } from '@playwright/test';
import { API_BASE } from './mocks';

/**
 * Authentication Tests — Login & Signup
 */

// ── Login Page ────────────────────────────────────────────────────────────────

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('renders the login page with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
  });

  test('shows email and password input fields', async ({ page }) => {
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('shows "Sign In" submit button', async ({ page }) => {
    await expect(page.locator('form').getByRole('button', { name: /Sign In/i })).toBeVisible();
  });

  test('shows "Demo User" and "Admin Login" quick-fill buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Demo User/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Admin Login/i })).toBeVisible();
  });

  test('shows "Sign up here" link that leads to /signup', async ({ page }) => {
    const signupLink = page.getByRole('link', { name: /Sign up here/i });
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    await expect(page).toHaveURL('/signup');
  });

  test('shows validation error when email is empty', async ({ page }) => {
    await page.locator('form').getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText(/Please enter your email/i)).toBeVisible();
  });

  test('shows validation error when password is empty', async ({ page }) => {
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('form').getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText(/Please enter your password/i)).toBeVisible();
  });

  test('"Demo User" button fills demo credentials', async ({ page }) => {
    await page.getByRole('button', { name: /Demo User/i }).click();
    await expect(page.locator('input[name="email"]')).toHaveValue('demo@velandev.com');
    await expect(page.locator('input[name="password"]')).toHaveValue('demo123');
  });

  test('"Admin Login" button fills admin credentials', async ({ page }) => {
    await page.getByRole('button', { name: /Admin Login/i }).click();
    await expect(page.locator('input[name="email"]')).toHaveValue('admin@velandev.com');
    await expect(page.locator('input[name="password"]')).toHaveValue('admin123');
  });

  test('email input accepts typed text', async ({ page }) => {
    await page.locator('input[name="email"]').fill('user@sunshine.com');
    await expect(page.locator('input[name="email"]')).toHaveValue('user@sunshine.com');
  });

  test('password input masks characters', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('successful login as demo user redirects to /dashboard', async ({ page }) => {
    await page.route(`${API_BASE}/api/auth/login`, async (route) => {
      await route.fulfill({
        json: {
          access_token: 'demo-jwt-token',
          user: { id: 1, email: 'demo@velandev.com', name: 'Demo User', is_admin: false, created_at: '2024-01-01' },
        },
      });
    });
    await page.route(`${API_BASE}/api/auth/me`, async (route) => {
      await route.fulfill({
        json: { id: 1, email: 'demo@velandev.com', name: 'Demo User', is_admin: false, created_at: '2024-01-01' },
      });
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

    await page.locator('input[name="email"]').fill('demo@velandev.com');
    await page.locator('input[name="password"]').fill('demo123');
    await page.locator('form').getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText(/Login successful|Redirecting/i)).toBeVisible();
    await page.waitForURL('/dashboard', { timeout: 5000 });
    await expect(page).toHaveURL('/dashboard');
  });

  test('successful login as admin redirects to /admin', async ({ page }) => {
    await page.route(`${API_BASE}/api/auth/login`, async (route) => {
      await route.fulfill({
        json: {
          access_token: 'admin-jwt-token',
          user: { id: 2, email: 'admin@velandev.com', name: 'Admin User', is_admin: true, created_at: '2024-01-01' },
        },
      });
    });
    await page.route(`${API_BASE}/api/auth/me`, async (route) => {
      await route.fulfill({
        json: { id: 2, email: 'admin@velandev.com', name: 'Admin User', is_admin: true, created_at: '2024-01-01' },
      });
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

    await page.locator('input[name="email"]').fill('admin@velandev.com');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('form').getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText(/Login successful|Redirecting/i)).toBeVisible();
    await page.waitForURL('/admin', { timeout: 5000 });
    await expect(page).toHaveURL('/admin');
  });

  test('failed login shows error message', async ({ page }) => {
    await page.route(`${API_BASE}/api/auth/login`, async (route) => {
      await route.fulfill({
        status: 401,
        json: { detail: 'Invalid email or password' },
      });
    });
    await page.locator('input[name="email"]').fill('wrong@example.com');
    await page.locator('input[name="password"]').fill('wrongpass');
    await page.locator('form').getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText(/Invalid email or password|Login failed/i)).toBeVisible();
  });

  test('"Sign In" button shows loading state while submitting', async ({ page }) => {
    // Delay the response to observe loading state
    await page.route(`${API_BASE}/api/auth/login`, async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({ status: 401, json: { detail: 'Error' } });
    });
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="password"]').fill('password');
    await page.locator('form').getByRole('button', { name: /Sign In/i }).click();
    await expect(page.locator('form').getByRole('button', { name: /Signing In/i })).toBeVisible();
  });
});

// ── Signup Page ───────────────────────────────────────────────────────────────

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('renders the signup page with correct heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Create Account|Join|Sign Up/i })).toBeVisible();
  });

  test('shows all four form fields', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  });

  test('shows "Create Account" submit button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();
  });

  test('has "Login here" link that leads to /login', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: /Login here/i });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL('/login');
  });

  test('shows error when name field is empty', async ({ page }) => {
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/Please enter your name/i)).toBeVisible();
  });

  test('shows error when email is empty', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/Please enter your email/i)).toBeVisible();
  });

  test('shows error when email format is invalid', async ({ page }) => {
    // Disable HTML5 native email validation so React's custom check runs
    await page.locator('form').evaluate(form => form.setAttribute('novalidate', ''));
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('not-a-valid-email');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('shows error when password is empty', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/Please enter a password/i)).toBeVisible();
  });

  test('shows error when password is too short (< 6 chars)', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="password"]').fill('12345');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/at least 6 characters/i)).toBeVisible();
  });

  test('shows error when passwords do not match', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('input[name="password"]').fill('password123');
    await page.locator('input[name="confirmPassword"]').fill('different456');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/Passwords do not match/i)).toBeVisible();
  });

  test('password and confirm fields mask characters', async ({ page }) => {
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
    await expect(page.locator('input[name="confirmPassword"]')).toHaveAttribute('type', 'password');
  });

  test('successful signup redirects to /dashboard', async ({ page }) => {
    await page.route(`${API_BASE}/api/auth/signup`, async (route) => {
      await route.fulfill({
        json: {
          access_token: 'new-user-token',
          user: { id: 3, email: 'new@test.com', name: 'New User', is_admin: false, created_at: '2024-03-01' },
        },
      });
    });
    await page.route(`${API_BASE}/api/auth/me`, async (route) => {
      await route.fulfill({
        json: { id: 3, email: 'new@test.com', name: 'New User', is_admin: false, created_at: '2024-03-01' },
      });
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

    await page.locator('input[name="name"]').fill('New User');
    await page.locator('input[name="email"]').fill('new@test.com');
    await page.locator('input[name="password"]').fill('password123');
    await page.locator('input[name="confirmPassword"]').fill('password123');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await page.waitForURL('/dashboard', { timeout: 5000 });
    await expect(page).toHaveURL('/dashboard');
  });

  test('failed signup shows error message', async ({ page }) => {
    await page.route(`${API_BASE}/api/auth/signup`, async (route) => {
      await route.fulfill({
        status: 400,
        json: { detail: 'Email already registered' },
      });
    });

    await page.locator('input[name="name"]').fill('Existing User');
    await page.locator('input[name="email"]').fill('existing@test.com');
    await page.locator('input[name="password"]').fill('password123');
    await page.locator('input[name="confirmPassword"]').fill('password123');
    await page.getByRole('button', { name: /Create Account/i }).click();
    await expect(page.getByText(/Email already registered|signup failed/i)).toBeVisible();
  });
});
