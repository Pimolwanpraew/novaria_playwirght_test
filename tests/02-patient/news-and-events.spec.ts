import { test, expect } from '@playwright/test';

test.describe('ทดสอบหน้าข่าวสารและบทความทางการแพทย์', () => {
  test('TC-NWS-01: ผู้ใช้สามารถดูรายการข่าวสารและคลิกอ่านรายละเอียดได้', async ({ page }) => {
    // ไปที่หน้าข่าวสาร
    await page.goto('/news'); // หรือ URL ที่ถูกต้อง
    await expect(page.locator('h1', { hasText: 'ข่าวสารและ บทความทางการแพทย์' })).toBeVisible();
    
    // ตรวจสอบว่ามีรายการข่าวแสดงอยู่ (โดยตรวจสอบปุ่ม "อ่านต่อ")
    const readMoreButtons = page.locator('text="อ่านต่อ"');
    await expect(readMoreButtons.first()).toBeVisible();
    
    // ทดลองคลิกเข้าไปอ่านข่าวแรก
    await readMoreButtons.first().click();
    // เพิ่ม expect ตรวจสอบว่าเข้าสู่หน้ารายละเอียดข่าว
  });
});