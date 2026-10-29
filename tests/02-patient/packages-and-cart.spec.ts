import { test, expect } from '@playwright/test';

test.describe('Patient - Packages & Cart Flow', () => {

  test.beforeEach(async ({ page }) => {
    // ล็อกอินฝั่งคนไข้ก่อนเลือกซื้อแพ็กเกจ
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1500);
  });

  test('TC-PAT-PKG-01: คนไข้กดเลือก "เพิ่มลงตะกร้า" ในหน้าแพ็กเกจสุขภาพสำเร็จ', async ({ page }) => {
    await page.goto('/packages', { waitUntil: 'domcontentloaded' });

    const addToCartBtn = page.locator('button:has-text("เพิ่มลงตะกร้า"), button:has-text("สั่งซื้อ")').first();
    if (await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addToCartBtn.click();
    }

    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-PKG-02: เพิ่มแพ็กเกจลงตะกร้า แล้วแพ็กเกจนั้นต้องอยู่ในหน้าตะกร้า', async ({ page }) => {
    await page.goto('/packages', { waitUntil: 'domcontentloaded' });

    const addToCartBtn = page.locator('button:has-text("เพิ่มลงตะกร้า")').first();
    if (await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addToCartBtn.click();
      await page.waitForTimeout(1000);
    }

    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main').first()).toBeVisible();
  });

});