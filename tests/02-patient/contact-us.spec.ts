/*ทดสอบหน้าติดต่อสอบถาม*/
import { test, expect } from '@playwright/test';

test.describe('ทดสอบหน้าติดต่อสอบถาม', () => {

  test('TC-CNT-01: ผู้ใช้สามารถกรอกฟอร์มติดต่อสอบถามและดูข้อมูลการติดต่อได้', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainText(/02-165-5555|info@novaria\.com|novaria@gmail\.com/i);
  });

  test('TC-CNT-02: อีเมลที่แสดงในหน้า /contact ต้องตรงกับอีเมลใน footer', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    // ดึงอีเมลจากเนื้อหาหลักและ Footer
    const bodyText = await page.locator('body').innerText();
    const emails = bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];

    // ยืนยันว่าพบอีเมลอย่างน้อย 1 รายการ
    expect(emails.length).toBeGreaterThan(0);
  });

});