/*ทดสอบระบบแบบประเมินสุขภาพใจของผู้ป่วย*/
import { test, expect } from '@playwright/test';

test.describe('ทดสอบระบบแบบประเมินสุขภาพใจ', () => {
  test('TC-MHA-01: ผู้ใช้สามารถเข้าถึงหน้าเริ่มทำแบบประเมินและเริ่มทำแบบทดสอบได้', async ({ page }) => {
    // ไปที่หน้าแรกของแบบประเมิน
    await page.goto('/mental-health');
    await expect(page.locator('text="วันนี้... ใจเราเป็นอย่างไร?"')).toBeVisible();
    
    // คลิกปุ่ม "เริ่มทำแบบประเมิน"
    await page.click('text="เริ่มทำแบบประเมิน"');
    
    // ตรวจสอบว่าเข้าสู่หน้าทำแบบทดสอบ (Step 1)
    await expect(page).toHaveURL(/.*mental-health\/assessment/);
    await expect(page.locator('h1', { hasText: 'แบบประเมินสุขภาพจิต' })).toBeVisible();
    
    // ทดลองกรอกข้อมูลเบื้องต้น (Step 1)
    // เลือกเพศ (สมมติเป็นชาย)
    await page.click('button:has-text("ชาย")'); 
    // เลือกช่วงอายุ (สมมติ 20 - 39 ปี)
    await page.click('button:has-text("20 - 39 ปี")');
    // เลือกปัจจัยเสี่ยง (สมมติว่างงาน)
    await page.click('button:has-text("ว่างงาน")');
    
    // สมมติว่ามีปุ่ม "ถัดไป" 
    // const nextButton = page.locator('button:has-text("ถัดไป")');
    // await expect(nextButton).toBeEnabled(); 
  });
});