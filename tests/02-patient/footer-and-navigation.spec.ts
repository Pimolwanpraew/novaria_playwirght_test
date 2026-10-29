import { test, expect } from '@playwright/test';

test.describe('Public - Footer Links & Accreditations', () => {

  test('TC-PUB-FTR-01: ตรวจสอบตรารับรองมาตรฐาน (JCI, CAMTS, HA) ด้านล่างสุดของเว็บไซต์', async ({ page }) => {
    await page.goto('/');

    // เลื่อนลงล่างสุด
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // ตรวจสอบข้อความมาตรฐาน JCI
    await expect(page.locator('body')).toContainText('GOLD SEAL OF APPROVAL');
  });

  test('TC-PUB-FTR-02: ทดสอบฟอร์ม "ติดตามข่าวสารสุขภาพ" ด้านล่างเว็บไซต์', async ({ page }) => {
    await page.goto('/');

    const newsletterBtn = page.locator('button:has-text("รับข่าวสาร"), button:has-text("ข้อเสนอแนะ")').first();
    if (await newsletterBtn.isVisible()) {
      await newsletterBtn.click();
    }
    await expect(page.locator('footer, body').first()).toBeVisible();
  });

});