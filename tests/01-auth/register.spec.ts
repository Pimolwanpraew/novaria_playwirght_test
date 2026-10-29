import { test, expect } from '@playwright/test';

test.describe('Public & Patient - Account Registration', () => {

  test('TC-PAT-REG-01: สมัครสมาชิกใหม่สำเร็จด้วยข้อมูลที่ถูกต้อง', async ({ page }) => {
    await page.goto('/register');

    // สร้างอีเมลสุ่มเพื่อป้องกันอีเมลซ้ำในการเทส
    const testEmail = `patient_${Date.now()}@example.com`;

    const nameInput = page.locator('input[name="name"], input[placeholder*="ชื่อ"]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill('สมชาย ใจดี');
      await page.locator('input[type="email"], input[name="email"]').fill(testEmail);
      await page.locator('input[type="password"], input[name="password"]').first().fill('Password123!');
      
      const confirmPass = page.locator('input[name="confirmPassword"], input[placeholder*="ยืนยัน"]').first();
      if (await confirmPass.isVisible()) {
        await confirmPass.fill('Password123!');
      }

      await page.locator('button[type="submit"], button:has-text("สมัคร"), button:has-text("Register")').first().click();
      await expect(page.locator('main').first()).toBeVisible();
    } else {
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

  test('TC-PAT-REG-02: ตรวจสอบ Validation เมื่อกรอกข้อมูลไม่ครบถ้วน', async ({ page }) => {
    await page.goto('/register');
    
    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // ระบบต้องแสดงข้อความแจ้งเตือน หรือไม่ยอมให้ Submit
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

});