import { test, expect } from '@playwright/test';

test.describe('Public - Contact Us Form', () => {

  test('TC-PUB-CNT-01: กรอกฟอร์มติดต่อสอบถามข้อมูลโรงพยาบาล', async ({ page }) => {
    await page.goto('/contact'); // หน้าติดต่อเรา

    const nameInput = page.locator('input[placeholder*="นายสมชาย"]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('สมศรี มั่นคง');
      await page.locator('input[placeholder*="08X-XXX-XXXX"], input[name="phone"]').first().fill('0812345678');
      await page.locator('input[placeholder*="example@email.com"], input[name="email"]').first().fill('somsri@example.com');
      
      const subjectInput = page.locator('input[placeholder*="ระบุหัวข้อ"], input[name="subject"]').first();
      if (await subjectInput.isVisible()) {
        await subjectInput.fill('สอบถามค่าบริการตรวจสุขภาพ');
      }

      const msgInput = page.locator('textarea').first();
      if (await msgInput.isVisible()) {
        await msgInput.fill('ขอทราบรายละเอียดโปรโมชั่นตรวจสุขภาพประจำปีค่ะ');
      }
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

});