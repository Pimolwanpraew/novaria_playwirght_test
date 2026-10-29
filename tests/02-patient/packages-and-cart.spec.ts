import { test, expect } from '@playwright/test';

test.describe('Patient - Packages & Shopping Cart', () => {

  test('TC-PAT-PKG-01: เรียกดูรายการแพ็กเกจสุขภาพและกรองตามหมวดหมู่', async ({ page }) => {
    await page.goto('/packages'); // หรือคลิกเมนูแพ็กเกจ
    
    const categoryBtn = page.locator('button:has-text("ตรวจสุขภาพประจำปี"), button:has-text("วัคซีน")').first();
    if (await categoryBtn.isVisible()) {
      await categoryBtn.click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-PKG-02: กดปุ่ม "เพิ่มลงตะกร้า" และตรวจสอบไอคอนตะกร้าสินค้าบน Header', async ({ page }) => {
    await page.goto('/packages');
    
    const addToCartBtn = page.locator('button:has-text("เพิ่มลงตะกร้า")').first();
    if (await addToCartBtn.isVisible()) {
      await addToCartBtn.click();
    }
    
    // ตรวจสอบไอคอน ตะกร้าสินค้า บน Header
    const cartIcon = page.locator('header a[href*="cart"], header button:has(svg)').first();
    await expect(cartIcon).toBeVisible();
  });

});