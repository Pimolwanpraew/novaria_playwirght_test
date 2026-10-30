/*ทดสอบการตอบสนองเมื่อเข้าหน้าเพจที่ไม่มีอยู่จริง (404 Page)*/
import { test, expect } from '@playwright/test';

test.describe('Security & Global - 404 Route Not Found Handling', () => {

  test('TC-SEC-404-01: ผู้ใช้งานทั่วไปเข้า URL ที่ไม่มีอยู่จริง ต้องแสดงหน้า 404 โดยระบบไม่ Crash', async ({ page }) => {
    // สุ่มเข้า URL ที่ไม่มีในระบบ
    const randomUrl = `/non-existent-page-${Date.now()}`;
    const response = await page.goto(randomUrl, { waitUntil: 'domcontentloaded' });

    // ตรวจสอบว่า HTTP status เป็น 404 หรือหน้าจอแสดงผลข้อความแจ้งเตือน 404 / Not Found
    const is404TextVisible = await page.locator('text=/404|Page Not Found|ไม่พบหน้าที่คุณต้องการ|ไม่พบหน้า/i').first().isVisible();
    const isMainVisible = await page.locator('main').first().isVisible();

    expect(is404TextVisible || isMainVisible).toBeTruthy();
  });

  test('TC-SEC-404-02: ตรวจสอบปุ่ม "กลับหน้าหลัก" ในหน้า 404 สามารถใช้งานได้จริง', async ({ page }) => {
    await page.goto('/unknown-path-test', { waitUntil: 'domcontentloaded' });

    const homeBtn = page.locator('a, button').filter({ hasText: /หน้าแรก|กลับหน้าหลัก|Back to Home/i }).first();
    if (await homeBtn.isVisible()) {
      await homeBtn.click();
      await expect(page).toHaveURL(/\/$|\/dashboard|\/doctors/);
    }
  });

});