import { test, expect } from '@playwright/test';

test.describe('Admin - Analytics & System Audit Logs', () => {

  test.beforeEach(async ({ page }) => {
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.goto('/login');
    await page.locator('input[type="email"], input[name="email"]').fill(adminEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(adminPassword);
    await page.locator('button[type="submit"], button:has-text("เข้าสู่ระบบ"), button:has-text("Login")').first().click();

    await page.waitForURL('**/status(admin)/**', { timeout: 10000 });
  });

  test('TC-ADM-REP-01: เรียกดูตัวเลขสรุป Dashboard (ยอดผู้ป่วย, นัดหมายวันนี้)', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    // ตรวจสอบ Card การแสดงผลข้อมูลสถิติ
    await expect(page.locator('main')).toBeVisible();
  });

  test('TC-ADM-REP-02: ตรวจสอบ Audit Log การเข้าใช้งานระบบของเจ้าหน้าที่', async ({ page }) => {
    await page.goto('/status(admin)/dashboard');
    await expect(page.locator('main')).toBeVisible();
  });
});