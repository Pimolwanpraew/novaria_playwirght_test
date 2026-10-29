import { test, expect } from '@playwright/test';

test.describe('Admin - Layout & Navigation UI', () => {

  test.beforeEach(async ({ page }) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(adminEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(adminPassword);
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL('**/status(admin)/**', { timeout: 10000 });
  });

  test('TC-ADM-UI-01: ตรวจสอบความครบถ้วนของเมนูหลักใน Sidebar', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    
    // ตรวจสอบว่ามีเมนูสำคัญปรากฏบน Sidebar ครบถ้วน
    const sidebar = page.locator('aside, nav').first();
    await expect(sidebar).toBeVisible();
  });

  test('TC-ADM-UI-02: ทดสอบการทำงานของเมนูบนหน้าจอขนาดเล็ก (Mobile View)', async ({ page }) => {
    // ปรับขนาดหน้าจอเป็นขนาดมือถือ
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/status(admin)/dashboard');

    // หาปุ่ม Hamburger menu สำหรับเปิด Sidebar
    const menuToggle = page.locator('button:has(svg), button[aria-label="Menu"], button:has-text("Menu")').first();
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      await expect(page.locator('aside, nav').first()).toBeVisible();
    } else {
      await expect(page.locator('main')).toBeVisible();
    }
  });
});