import { test, expect } from '@playwright/test';

test.describe('Admin - User Management Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-USR-01: แอดมินพบเมนู "จัดการผู้ใช้งาน" บนหน้า Admin Main Portal', async ({ page }) => {
    await page.goto('/admin/main');

    // ตรวจสอบปุ่ม/เมนู จัดการผู้ใช้งาน บน UI จริง
    const userMgmtMenu = page.locator('text="จัดการผู้ใช้งาน"').first();
    await expect(userMgmtMenu).toBeVisible();
  });

});