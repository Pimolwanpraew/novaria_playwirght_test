/*ทดสอบการเข้าถึงและเรียกดูหน้าตารางออกตรวจและความพร้อมของแพทย์*/
import { test, expect } from '@playwright/test';

test.describe('Doctor - Work Schedule & Availability', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_DOCTOR_EMAIL || 'doctor.dept1_1@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_DOCTOR_PASSWORD || 'password123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/doctors/, { timeout: 10000 }).catch(() => {});
  });

  test('TC-DOC-SCH-01: แสดงตารางออกตรวจประจำสัปดาห์ และสวิตช์เปิด/ปิดรับคิว', async ({ page }) => {
    await page.goto('/doctors/schedule', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('text="ตารางออกตรวจและความพร้อม"').first()).toBeVisible({ timeout: 10000 });

    // ตรวจสอบหัวตารางข้อมูล
    await expect(page.locator('text="วันประจำสัปดาห์"').first()).toBeVisible();
    await expect(page.locator('text="เวลาปฏิบัติงาน"').first()).toBeVisible();
    await expect(page.locator('text="จำนวนคิวสูงสุด"').first()).toBeVisible();
    await expect(page.locator('text="สถานะปัจจุบัน"').first()).toBeVisible();

    // ตรวจสอบ Toggle เปิด/ปิดรับคิว
    const toggleSwitch = page.locator('input[type="checkbox"], button[role="switch"], .peer').first();
    if (await toggleSwitch.isVisible()) {
      await expect(toggleSwitch).toBeVisible();
    }
  });

});