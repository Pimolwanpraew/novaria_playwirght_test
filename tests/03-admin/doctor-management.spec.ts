import { test, expect } from '@playwright/test';

test.describe('Admin - Doctor Management Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-DOC-01: แอดมินพบเมนู "จัดการแพทย์" บนหน้า Admin Main Portal', async ({ page }) => {
    await page.goto('/admin/main');

    // ตรวจสอบเมนูจัดการแพทย์
    const doctorMgmtMenu = page.locator('text="จัดการแพทย์"').first();
    await expect(doctorMgmtMenu).toBeVisible();
  });

});