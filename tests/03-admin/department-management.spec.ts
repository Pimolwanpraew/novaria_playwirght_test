import { test, expect } from '@playwright/test';

test.describe('Admin - Department Management Control', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"], input[name="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-DEP-01: แอดมินเข้าหน้าจัดการแผนกการรักษา ตรวจสอบฟอร์มเพิ่มแผนกและรายชื่อแผนกทั้งหมด', async ({ page }) => {
    await page.goto('/admin/departments');

    // ตรวจสอบส่วนหัวของหน้า
    await expect(page.locator('text="จัดการแผนกการรักษา (Departments Control)"').first()).toBeVisible();
    await expect(page.locator('text="เพิ่มแผนกการรักษาใหม่"').first()).toBeVisible();

    // ตรวจสอบตารางรายชื่อแผนกทั้งหมดในระบบ
    await expect(page.locator('text=/รายชื่อแผนกทั้งหมดในระบบ/i').first()).toBeVisible();
  });

});