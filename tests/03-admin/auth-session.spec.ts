/*ทดสอบการเข้าถึงและเรียกดูหน้าการจัดการบัญชีผู้ใช้และเซสชันของระบบสำหรับแอดมิน*/
import { test, expect } from '@playwright/test';

test.describe('Admin - Profile & Session Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"], input[name="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-SES-01: แอดมินเรียกดูส่วนแสดงชื่อบัญชีผู้ใช้บน Portal', async ({ page }) => {
    await page.goto('/admin/main');
    const adminBadge = page.locator('text=/Admin|admin@novaria.com/i').first();
    await expect(adminBadge).toBeVisible();
  });

  test('TC-ADM-SES-02: ตรวจสอบปุ่มกลับหน้าเว็บหลักบน Admin Portal', async ({ page }) => {
    await page.goto('/admin/main');

    // อ้างอิงจากปุ่มบน UI จริงตามรูปภาพ: "กลับหน้าเว็บหลัก"
    const backHomeBtn = page.getByRole('link', { name: /กลับหน้าเว็บหลัก/i }).or(page.locator('text="กลับหน้าเว็บหลัก"')).first();
    await expect(backHomeBtn).toBeVisible();
  });

});