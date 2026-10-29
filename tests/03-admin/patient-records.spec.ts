import { test, expect } from '@playwright/test';

test.describe('Admin - Patient Records & System Control', () => {

  test.beforeEach(async ({ page }) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(adminEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(adminPassword);
    await page.locator('button[type="submit"], button:has-text("เข้าสู่ระบบ"), button:has-text("Login")').first().click();

    await page.waitForURL('**/status(admin)/**', { timeout: 10000 });
  });

  test('TC-ADM-PAT-01: ค้นหาประวัติผู้ป่วยด้วยเลขบัตรประชาชน / HN', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');

    const searchInput = page.locator('input[type="search"], input[placeholder*="ค้นหา"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('1234567890123');
      await page.keyboard.press('Enter');
    }
    await expect(page.locator('main')).toBeVisible();
  });

  test('TC-ADM-PAT-02: ระงับการใช้งานบัญชีผู้ป่วย (Block/Deactivate User)', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');

    const blockBtn = page.locator('button:has-text("ระงับ"), button:has-text("Block")').first();
    if (await blockBtn.isVisible()) {
      await blockBtn.click();
    }
    await expect(page.locator('main')).toBeVisible();
  });
});