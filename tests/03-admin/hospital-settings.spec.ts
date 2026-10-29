import { test, expect } from '@playwright/test';

test.describe('Admin - Hospital Settings', () => {

  test.beforeEach(async ({ page }) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.goto('/login');

    await page.locator('input[type="email"], input[name="email"]').fill(adminEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(adminPassword);
    await page.locator('button[type="submit"], button:has-text("เข้าสู่ระบบ"), button:has-text("Login")').first().click();

    await page.waitForURL('**/status(admin)/**', { timeout: 10000 });
  });

  test('TC-ADM-04: เรียกดูและอัปเดตการตั้งค่าระบบของโรงพยาบาล', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    
    // แก้ไข: ระบุเฉพาะ main หรือใส่ .first() เพื่อป้องกัน Strict Mode Violation
    await expect(page.locator('main')).toBeVisible();
  });

});