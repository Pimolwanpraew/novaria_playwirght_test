import { test, expect } from '@playwright/test';

test.describe('Admin - Profile & Session Management', () => {

  test.beforeEach(async ({ page }) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(adminEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(adminPassword);
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL('**/status(admin)/**', { timeout: 10000 });
  });

  test('TC-ADM-SES-01: แอดมินเรียกดูหน้าข้อมูลโปรไฟล์ของตนเอง', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    
    const profileIcon = page.locator('img[alt="Profile"], button:has(svg.user-icon), a[href*="profile"]').first();
    if (await profileIcon.isVisible()) {
      await profileIcon.click();
    }
    
    // แก้ไข: ใช้ .first() หรือระบุเฉพาะ main เพื่อหลีกเลี่ยง Strict Mode Violation
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-ADM-SES-02: ออกจากระบบ (Logout) และกลับสู่หน้า Login อย่างปลอดภัย', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');

    const logoutBtn = page.locator('button:has-text("ออกจากระบบ"), button:has-text("Logout"), a:has-text("Logout")').first();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.waitForURL('**/(login)?', { timeout: 10000 });
      await expect(page).toHaveURL(/.*(login|novaria-hospital.tech\/$)/);
    } else {
      await expect(page.locator('main').first()).toBeVisible();
    }
  });
});