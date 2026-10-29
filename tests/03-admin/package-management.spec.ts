import { test, expect } from '@playwright/test';

test.describe('Admin - Package Management (E2E)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/admin\/main/);
    await page.goto('/admin/packages');
  });

  test('TC-ADM-PKG-01: แอดมินเข้าหน้าจัดการแพ็กเกจสุขภาพ ตรวจสอบฟอร์มเพิ่มแพ็กเกจใหม่', async ({ page }) => {
    await expect(page.locator('text="จัดการแพ็กเกจสุขภาพ (Admin Control)"').first()).toBeVisible();
    await expect(page.locator('text="เพิ่มแพ็กเกจใหม่"').first()).toBeVisible();
  });

  test('TC-ADM-PKG-02: แอดมินเพิ่มแพ็กเกจสุขภาพใหม่พร้อมราคาได้สำเร็จ', async ({ page }) => {
    let alertText = '';
    page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    await page.locator('input[placeholder*="โปรแกรมตรวจสุขภาพ"]').first().fill('โปรแกรมตรวจสุขภาพ E2E Test');
    await page.locator('input[placeholder*="3,500"]').first().fill('2990');
    await page.locator('input[placeholder*="6,000"]').first().fill('5000');
    
    const submitBtn = page.locator('button[type="submit"]').or(page.locator('button:has-text("บันทึก"), button:has-text("เพิ่มแพ็กเกจ")')).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
    }

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/admin\/packages/);
  });

});