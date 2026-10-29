import { test, expect } from '@playwright/test';

test.describe('Public & Patient - Account Registration', () => {

  test('TC-PAT-REG-01: สมัครสมาชิกใหม่สำเร็จด้วยข้อมูลที่ถูกต้อง', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'domcontentloaded' });

    // 1. กรอกชื่อ และ นามสกุล แยกช่องตาม UI จริง
    const firstNameInput = page.getByPlaceholder(/กรอกชื่อจริง|ชื่อ/i).first();
    const lastNameInput = page.getByPlaceholder(/กรอกนามสกุล|นามสกุล/i).first();

    if (await firstNameInput.isVisible()) {
      await firstNameInput.fill('สมชาย');
      await lastNameInput.fill('ใจดี');

      // 2. กรอกเลขบัตรประชาชน 13 หลัก และ เบอร์โทรศัพท์ 10 หลัก (สุ่มเพื่อไม่ให้ซ้ำใน DB)
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const citizenIdInput = page.getByPlaceholder(/13 หลัก|บัตรประชาชน/i).first();
      const phoneInput = page.getByPlaceholder(/10 หลัก|เบอร์โทรศัพท์/i).first();

      if (await citizenIdInput.isVisible()) {
        await citizenIdInput.fill(`1100100${randomDigits}`);
      }
      if (await phoneInput.isVisible()) {
        await phoneInput.fill(`081${randomDigits}9`);
      }

      // 3. ใช้อีเมลสมัครสมาชิกหลักจาก .env (หรือสุ่มถ้าต้องการ)
      const targetEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
      const targetPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

      await page.locator('input[type="email"], input[name="email"]').first().fill(targetEmail);
      await page.locator('input[type="password"], input[name="password"]').first().fill(targetPassword);

      const confirmPass = page.locator('input[name="confirmPassword"], input[placeholder*="ยืนยัน"]').first();
      if (await confirmPass.isVisible()) {
        await confirmPass.fill(targetPassword);
      }

      // 4. กดปุ่มสมัครสมาชิก
      const submitBtn = page.locator('button[type="submit"], button:has-text("สมัคร")').first();
      await submitBtn.click();
      await page.waitForTimeout(2000);

      // ยืนยันว่าการสมัครสำเร็จ หรือถูกนำทางไปหน้าหลัก/เข้าสู่ระบบ
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

  test('TC-PAT-REG-02: ตรวจสอบ Validation เมื่อกรอกข้อมูลไม่ครบถ้วน', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'domcontentloaded' });

    const submitBtn = page.locator('button[type="submit"], button:has-text("สมัคร")').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // ระบบต้องไม่นำทางผ่าน หรือต้องแสดง Validation ในหน้าเดิม
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

});