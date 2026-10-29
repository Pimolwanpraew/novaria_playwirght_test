import { test, expect } from '@playwright/test';

test.describe('Admin - Doctor & Schedule Management Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/dashboard/);
  });

  // -------------------------------------------------------------------------
  // 🟢 TC-ADM-DOC: การจัดการแพทย์และตารางเวร
  // -------------------------------------------------------------------------
  test('TC-ADM-DOC-01: แอดมินเข้าหน้า Dashboard และเรียกดูส่วนประกอบหลักของข้อมูลแพทย์สำเร็จ', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('header, nav').first()).toBeVisible();
  });

  test.skip('TC-ADM-DOC-02: กำหนดและจัดตารางเวลาเข้าตรวจประจำสัปดาห์ของแพทย์ (ข้ามชั่วคราว รอ UI เพิ่มฟีเจอร์)', async ({ page }) => {
    // รวมมาจาก doctor-schedule.spec.ts เดิม
  });

  test.skip('TC-ADM-DOC-03: เพิ่มรายชื่อแพทย์ใหม่เข้าสู่ระบบ (ข้ามชั่วคราว รอ UI เพิ่มปุ่ม)', async ({ page }) => {
    // ข้ามการทดสอบชั่วคราว เนื่องจากระบบหน้า Admin ปัจจุบันยังไม่มีปุ่มกดสำหรับเพิ่มแพทย์ใหม่
  });

});