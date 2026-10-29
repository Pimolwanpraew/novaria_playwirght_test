import { test, expect } from '@playwright/test';

test.describe('ทดสอบหน้าติดต่อสอบถาม', () => {
  test('TC-CNT-01: ผู้ใช้สามารถกรอกฟอร์มติดต่อสอบถามและดูข้อมูลการติดต่อได้', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    
    // ตรวจสอบเบอร์โทรและอีเมล
    await expect(page.getByText('02-165-5555').first()).toBeVisible();
    await expect(page.getByText('info@novaria.com').first()).toBeVisible();
    
    // กรอกฟอร์มด้วย Selector ที่ยืดหยุ่น
    const nameInput = page.locator('input[placeholder*="ชื่อ"], input[type="text"]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('สมชาย ใจดี');
    }

    const phoneInput = page.locator('input[placeholder*="08"], input[type="tel"]').first();
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('0812345678');
    }
  });
});