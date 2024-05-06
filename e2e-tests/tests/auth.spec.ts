import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173';

test('should allow user to sign in', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await page.locator('[name=email]').fill('alihamza@gmail.com');
  await page.locator('[name=password]').fill('alihamza');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('User signed in successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
});

test('should allow user to sign up', async ({ page }) => {
  const testEmail = `test${Math.floor(Math.random() * 100000)}@gmail.com`;
  await page.goto(URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(
    page.getByRole('heading', { name: 'Create an account' })
  ).toBeVisible();
  await page.locator('[name=firstName]').fill('mohammad');
  await page.locator('[name=lastName]').fill('abbass');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('mohammad');
  await page.locator('[name=confirmPassword]').fill('mohammad');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('User created successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
});
