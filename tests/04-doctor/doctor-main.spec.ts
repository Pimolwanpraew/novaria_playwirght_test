import { test, expect } from '@playwright/test';

test.describe('Doctor - Main Hub & Landing Page Navigation', () => {

  test.beforeEach(async ({ page }) => {
    // ล็อกอินเข้าสู่ระบบฝั่งแพทย์
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    const doctorEmail = process.env.TEST_DOCTOR_EMAIL || 'doctor.dept1_1@novaria.com';
    const doctorPassword = process.env.TEST_DOCTOR_PASSWORD || 'password123';

    await page.getByPlaceholder(/อีเมล|Email/i).fill(doctorEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(doctorPassword);
    
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/doctors/, { timeout: 10000 }).catch(() => {});
  });

  test('TC-DOC-HOM-01: แพทย์เข้าหน้าแรก (Landing Page) และแสดง Profile Badge ของหมอบน Navbar ได้ถูกต้อง', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // ตรวจสอบ Navbar Badge ฝั่งหมอ
    await expect(page.locator('text=/DOCTOR|นพ\.|พญ\./i').first()).toBeVisible({ timeout: 10000 });
  });

  test('TC-DOC-MAIN-01: ตรวจสอบหน้าหลักแพทย์ การ์ดเมนูปฏิบัติงาน และการแสดงผลสถานะพร้อมปฏิบัติงาน', async ({ page }) => {
    await page.goto('/doctors/main', { waitUntil: 'domcontentloaded' });

    // ตรวจสอบส่วนหัวและข้อความต้อนรับ
    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('text=/สวัสดี|นพ\.|พญ\./i').first()).toBeVisible({ timeout: 10000 });

    // ตรวจสอบสถานะแพทย์
    await expect(page.locator('text=/พร้อมปฏิบัติงาน|สถานะแพทย์/i').first()).toBeVisible();

    // ตรวจสอบการ์ดเมนูหลักทั้ง 3 ใบ
    await expect(page.locator('text="จัดการคิวและสถานะการตรวจ"').first()).toBeVisible();
    await expect(page.locator('text="ตารางออกตรวจประจำสัปดาห์"').first()).toBeVisible();
    await expect(page.locator('text="เวชระเบียนและประวัติการรักษา"').first()).toBeVisible();
  });

});