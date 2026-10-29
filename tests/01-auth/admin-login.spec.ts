import { test, expect } from '@playwright/test';

test.describe('Admin - Authentication', () => {

  test('TC-ADM-AUTH-01: แอดมินเข้าสู่ระบบสำเร็จและถูก Redirect ไปหน้า /dashboard', async ({ page }) => {
    await page.goto('/login');

    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.getByPlaceholder(/อีเมล|Email/i).fill(adminEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(adminPassword);
    await page.locator('button[type="submit"]').first().click();

    // ใช้ RegExp Literal แทนการใช้ String Glob วงเล็บ
    await page.waitForURL(/\/dashboard/);
    await expect(page).toHaveURL(/\/dashboard/);
  });

});