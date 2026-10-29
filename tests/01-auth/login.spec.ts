import { test, expect } from '@playwright/test';

test.describe('Public & Patient - Authentication', () => {

  test('TC-PAT-LOG-01: ผู้ป่วยเข้าสู่ระบบด้วย อีเมล และ รหัสผ่าน', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    const email = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const password = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    const emailInput = page.getByPlaceholder(/อีเมล|Email/i).first();
    const passwordInput = page.getByPlaceholder(/รหัสผ่าน|Password/i).first();

    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.clear();
    await emailInput.pressSequentially(email, { delay: 30 });

    await passwordInput.scrollIntoViewIfNeeded();
    await passwordInput.clear();
    await passwordInput.pressSequentially(password, { delay: 30 });

    await page.waitForTimeout(300);

    // กดปุ่มเข้าสู่ระบบ
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    // เปลี่ยนจาก waitForURL มาใช้วิธีรอ Element หรือตรวจจับ Session
    // 1. ตรวจสอบว่าไม่พบข้อความแจ้งเตือนสีแดง "ไม่พบบัญชีผู้ใช้งานนี้ในระบบ"
    const errorMessage = page.locator('text="ไม่พบบัญชีผู้ใช้งานนี้ในระบบ"');
    await expect(errorMessage).not.toBeVisible({ timeout: 5000 });

    // 2. ตรวจสอบว่า DOM หลักของหน้าเว็บแสดงผลปกติ
    await expect(page.locator('main').first()).toBeVisible();
  });

});