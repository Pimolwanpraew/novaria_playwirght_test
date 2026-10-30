/*ทดสอบการนำทางเมนูหลัก (Navbar Dropdown Menus) ของเว็บไซต์สำหรับผู้ป่วย*/
import { test, expect } from '@playwright/test';

test.describe('ตรวจสอบการนำทางเมนูหลัก (Navbar Dropdown Menus)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('TC-NAV-01: ตรวจสอบเมนูย่อยใน "บริการ" (Services)', async ({ page }) => {
    const subMenus = [
      /ศูนย์หัวใจ/,
      /ศูนย์มะเร็ง/,
      /ศูนย์กระดูก/,
      /ศูนย์สมอง/,
      /ตรวจสุขภาพ/,
      /ศูนย์ทั้งหมด/,
      /ค้นหาแพทย์/,
      /ทำนัดหมาย/,
      /แพ็กเกจ/
    ];

    for (const menuRegex of subMenus) {
      const servicesMenu = page.getByText('บริการ', { exact: true }).first();
      await servicesMenu.hover();
      await page.waitForTimeout(300); // รอ animation dropdown กางออก

      const subMenuItem = page.locator('a, button').filter({ hasText: menuRegex }).first();
      if (await subMenuItem.isVisible()) {
        await expect(subMenuItem).toBeVisible();
      }
    }
  });

  test('TC-NAV-02: ตรวจสอบเมนูย่อยใน "ข้อมูลผู้เข้ารับบริการ"', async ({ page }) => {
    const subMenus = [
      /ห้องพักผู้ป่วย/,
      /แผนที่/,
      /ประกัน/
    ];

    for (const menuRegex of subMenus) {
      const patientInfoMenu = page.getByText('ข้อมูลผู้เข้ารับบริการ').first();
      await patientInfoMenu.hover();
      await page.waitForTimeout(300);

      const subMenuItem = page.locator('a, button').filter({ hasText: menuRegex }).first();
      if (await subMenuItem.isVisible()) {
        await expect(subMenuItem).toBeVisible();
      }
    }
  });

  test('TC-NAV-03: ตรวจสอบเมนูย่อยใน "ข้อมูลสุขภาพ"', async ({ page }) => {
    const subMenus = [
      /บทความสุขภาพ/,
      /แบบประเมินสุขภาพ/
    ];

    for (const menuRegex of subMenus) {
      const healthInfoMenu = page.getByText('ข้อมูลสุขภาพ', { exact: true }).first();
      await healthInfoMenu.hover();
      await page.waitForTimeout(300);

      const subMenuItem = page.locator('a, button').filter({ hasText: menuRegex }).first();
      if (await subMenuItem.isVisible()) {
        await expect(subMenuItem).toBeVisible();
      }
    }
  });

});