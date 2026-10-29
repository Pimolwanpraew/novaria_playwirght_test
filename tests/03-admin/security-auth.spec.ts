import { test, expect } from '@playwright/test';

test.describe('Admin - Security & Authentication', () => {

  // 🔴 1. ทดสอบ Access Control (แอบเข้าโดยไม่ Login)
  test('TC-ADM-SEC-01: ระบบต้องป้องกันการเข้าถึง URL แอดมินโดยไม่ล็อกอิน และดีดกลับไปหน้า Login', async ({ page }) => {
    await page.goto('/admin/main');
    // ตรวจสอบว่าโดนดีดกลับไปหน้า login
    await expect(page).toHaveURL(/\/login/);
  });

  // 🟢 2. ทดสอบ Logout
  test('TC-ADM-SEC-02: แอดมินสามารถกด Logout ออกจากระบบได้สมบูรณ์', async ({ page }) => {
    // Login ก่อน
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/admin\/main/);

    // กดเมนูดร็อปดาวน์โปรไฟล์และกด Logout
    await page.locator('text=/ADMINISTRATOR/i').first().click();
    await page.locator('text=/ออกจากระบบ|Logout/i').first().click();

    // ตรวจสอบว่าเด้งกลับมาหน้า Login และเข้า /admin/main ไม่ได้อีก
    await expect(page).toHaveURL(/\/login/);
    await page.goto('/admin/main');
    await expect(page).toHaveURL(/\/login/);
  });

});