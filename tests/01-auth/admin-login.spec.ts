import { test, expect } from '@playwright/test';

test.describe('Admin - Authentication', () => {

  test('TC-ADM-AUTH-01: แอดมินเข้าสู่ระบบสำเร็จและถูก Redirect ไปหน้าแอดมิน', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.getByPlaceholder(/อีเมล|Email/i).fill(adminEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(adminPassword);
    await page.locator('button[type="submit"]').first().click();

    // ปรับ Pattern ให้รองรับทั้ง /admin/main และ /dashboard
    await page.waitForURL(/\/(admin\/main|dashboard|admin)/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/(admin\/main|dashboard|admin)/);
  });

});