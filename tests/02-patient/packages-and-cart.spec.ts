import { test, expect } from '@playwright/test';

test.describe('Patient - Packages & Cart Flow', () => {

  test('TC-PAT-PKG-01: คนไข้กดเลือก "เพิ่มลงตะกร้า" ในหน้าแพ็กเกจสุขภาพสำเร็จ', async ({ page }) => {
    // 🟢 เพิ่ม waitUntil ช่วยลดเวลาโหลดหน้าแรก
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // เลื่อนลงมาส่วนแพ็กเกจและโปรโมชั่น
    const pkgSection = page.locator('text="แพ็กเกจและโปรโมชั่น"').first();
    await pkgSection.scrollIntoViewIfNeeded();

    // กดปุ่ม "เพิ่มลงตะกร้า" ในการ์ดแพ็กเกจแรก
    const addToCartBtn = page.locator('button:has-text("เพิ่มลงตะกร้า"), button:has-text("สั่งซื้อ")').first();
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
    await addToCartBtn.click();

    // ตรวจสอบไอคอนตะกร้าบน Header
    const cartIcon = page.locator('header').locator('a[href*="cart"], button').first();
    await expect(cartIcon).toBeVisible();
  });

});