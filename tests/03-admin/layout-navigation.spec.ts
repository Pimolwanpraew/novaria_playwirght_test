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
    // แก้ไข: แยกการหา Header ให้ถูกต้องตาม CSS Selector
    const header = page.locator('header, nav, [role="navigation"]').first();
    await expect(header).toBeVisible();
  });

  test('TC-ADM-UI-02: ทดสอบการทำงานบนหน้าจอขนาดเล็ก (Mobile View)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/admin/main');

    await expect(page.locator('text=/สวัสดี.*Admin/i').first()).toBeVisible();
  });

});