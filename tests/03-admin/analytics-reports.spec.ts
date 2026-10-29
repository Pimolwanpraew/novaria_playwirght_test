import { test, expect } from '@playwright/test';

test.describe('Admin - Analytics & System Audit Logs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"], input[name="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-REP-01: แอดมินเรียกดูหน้าสถิติและแดชบอร์ดภาพรวม ตรวจสอบตัวเลขและกราฟสรุปผล', async ({ page }) => {
    // นำทางไปยังหน้าสถิติภาพรวม
    await page.goto('/admin/dashboard');

    // ตรวจสอบส่วนหัวของหน้าสถิติ
    await expect(page.locator('text="สถิติภาพรวมระบบโรงพยาบาล"').first()).toBeVisible();

    // ตรวจสอบปุ่มอัปเดตข้อมูล
    await expect(page.locator('button:has-text("อัปเดตข้อมูล")').first()).toBeVisible();

    // ตรวจสอบการแสดงผล Metric Cards (การนัดหมายทั้งหมด, ผู้ใช้งานในระบบ)
    await expect(page.locator('text="การนัดหมายทั้งหมด"').first()).toBeVisible();
    await expect(page.locator('text="ผู้ใช้งานในระบบ"').first()).toBeVisible();

    // ตรวจสอบพื้นที่แสดงกราฟสรุปผล
    await expect(page.locator('text="สัดส่วนการจองคิวจำแนกตามแผนก"').first()).toBeVisible();
  });

});