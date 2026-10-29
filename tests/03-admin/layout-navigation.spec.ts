import { test, expect } from '@playwright/test';

test.describe('Admin - Layout & Navigation UI', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"], input[name="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-UI-01: ตรวจสอบความครบถ้วนของ Header ในหน้า Admin Portal', async ({ page }) => {
    await page.goto('/admin/main');
    const header = page.locator('header, nav, [role="navigation"]').first();
    await expect(header).toBeVisible();
  });

  // =========================================================================
  // 🟢 เพิ่มเคส: ทดสอบกดเปิดเมนูดร็อปดาวน์บน Navbar หลัก
  // =========================================================================
  test('TC-ADM-UI-02: ตรวจสอบการเปิดเมนูดร็อปดาวน์บน Navbar (บริการ, ข้อมูลผู้เข้ารับบริการ, ข้อมูลสุขภาพ, เกี่ยวกับเรา)', async ({ page }) => {
    await page.goto('/admin/main');

    // 1. หมวด "บริการ"
    const serviceMenu = page.locator('text="บริการ"').first();
    await serviceMenu.hover();
    await expect(page.locator('text=/ศูนย์และคลินิกเฉพาะทาง|ค้นหาแพทย์|แพ็กเกจและโปรโมชั่น/i').first()).toBeVisible();

    // 2. หมวด "ข้อมูลผู้เข้ารับบริการ"
    const patientInfoMenu = page.locator('text="ข้อมูลผู้เข้ารับบริการ"').first();
    await patientInfoMenu.hover();
    await expect(page.locator('text=/ห้องพักผู้ป่วย|แผนที่และการเดินทาง|ประกัน/i').first()).toBeVisible();

    // 3. หมวด "ข้อมูลสุขภาพ"
    const healthInfoMenu = page.locator('text="ข้อมูลสุขภาพ"').first();
    await healthInfoMenu.hover();
    await expect(page.locator('text=/บทความสุขภาพ|แบบประเมินสุขภาพใจ/i').first()).toBeVisible();

    // 4. หมวด "เกี่ยวกับเรา"
    const aboutMenu = page.locator('text="เกี่ยวกับเรา"').first();
    await aboutMenu.hover();
    await expect(page.locator('text=/ประวัติโรงพยาบาล|ข่าวสารและกิจกรรม|ติดต่อสอบถาม/i').first()).toBeVisible();
  });

  test('TC-ADM-UI-03: ทดสอบการทำงานบนหน้าจอขนาดเล็ก (Mobile View)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/admin/main');

    await expect(page.locator('text=/สวัสดี.*Admin/i').first()).toBeVisible();
  });

});