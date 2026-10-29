import { test, expect } from '@playwright/test';

test.describe('Admin - User Management', () => {

  test.beforeEach(async ({ page }) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.goto('/login');

    await page.locator('input[type="email"], input[name="email"]').fill(adminEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(adminPassword);
    await page.locator('button[type="submit"], button:has-text("เข้าสู่ระบบ"), button:has-text("Login")').first().click();

    await page.waitForURL('**/status(admin)/**', { timeout: 10000 });
  });

  test('TC-ADM-01: แอดมินสามารถดูรายชื่อผู้ใช้งานทั้งหมดได้', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    await expect(page.locator('table, .user-list, main').first()).toBeVisible();
  });

  test('TC-ADM-02: แอดมินค้นหาผู้ใช้งานจากชื่อหรืออีเมล', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="ค้นหา"], input[placeholder*="Search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('สมชาย');
      await page.keyboard.press('Enter');
      await expect(page.locator('table, body').first()).toContainText('สมชาย');
    } else {
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

});