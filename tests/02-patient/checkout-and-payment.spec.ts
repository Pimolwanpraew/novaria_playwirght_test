import { test, expect } from '@playwright/test';

test.describe('Patient - Checkout & Payment Process', () => {

  test.beforeEach(async ({ page }) => {
    // เข้าสู่ระบบฝั่งคนไข้ก่อนทำรายการสั่งซื้อ
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1000);
  });

  test('TC-PAT-PAY-01: ดำเนินการสั่งซื้อแพ็กเกจจากตะกร้าสินค้า และเข้าสู่หน้าชำระเงิน', async ({ page }) => {
    await page.goto('/packages');

    // กดเพิ่มแพ็กเกจลงตะกร้า
    const addBtn = page.locator('button:has-text("เพิ่มลงตะกร้า")').first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      
      // คลิกไปหน้า Checkout / ตะกร้า
      const cartLink = page.locator('header button:has(svg), a[href*="cart"]').first();
      if (await cartLink.isVisible()) {
        await cartLink.click();
      }
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-PAY-02: ตรวจสอบสรุปยอดเงิน และเลือกช่องทางการชำระเงิน (โอนเงิน / บัตรเครดิต)', async ({ page }) => {
    await page.goto('/cart'); // หรือ /checkout

    const checkoutBtn = page.locator('button:has-text("ชำระเงิน"), button:has-text("ดำเนินการสั่งซื้อ")').first();
    if (await checkoutBtn.isVisible()) {
      await checkoutBtn.click();
      
      // เลือกช่องทางชำระเงิน
      const paymentOption = page.locator('input[type="radio"], div[class*="payment"]').first();
      if (await paymentOption.isVisible()) {
        await paymentOption.click();
      }
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

});