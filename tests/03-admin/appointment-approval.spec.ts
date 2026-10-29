import { test, expect } from '@playwright/test';

test.describe('Admin - Appointment Management Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"], input[name="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-APT-01: แอดมินเข้าหน้าจัดการและจัดสรรคิว ตรวจสอบรายการคิวรอและคิวที่จัดสรรแล้ว', async ({ page }) => {
    // นำทางไปยังหน้าจัดการคิวโดยตรง
    await page.goto('/admin/appointments');

    // ตรวจสอบ Header หลักของหน้า
    await expect(page.locator('text="จัดการและจัดสรรคิว (Assign Doctor)"').first()).toBeVisible();

    // ตรวจสอบส่วนรายการคิวรอการจัดสรรแพทย์ และคิวที่จัดสรรแล้ว
    await expect(page.locator('text=/รายการคิวรอการจัดสรรแพทย์/i').first()).toBeVisible();
    await expect(page.locator('text=/รายการคิวที่จัดสรรแพทย์แล้ว/i').first()).toBeVisible();

    // ตรวจสอบตารางแสดงข้อมูลคิว
    const queueTable = page.locator('table, [role="table"]').first();
    await expect(queueTable).toBeVisible();
  });

});