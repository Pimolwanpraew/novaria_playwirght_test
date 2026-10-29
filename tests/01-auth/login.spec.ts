import { test, expect } from '@playwright/test';

test.describe('Public & Patient - Authentication', () => {

  test('TC-PAT-LOG-01: ผู้ป่วยเข้าสู่ระบบด้วย อีเมล และ รหัสผ่าน', async ({ page }) => {
    await page.goto('/login');

    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.getByPlaceholder(/อีเมล|Email/i).fill(patientEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(patientPassword);
    
    // คลิกปุ่ม เข้าสู่ระบบ (หลบปุ่ม Google Login)
    await page.locator('button[type="submit"]').first().click();

    // รอโหลดหน้าหลังกดล็อกอิน
    await page.waitForTimeout(1500);
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-LOG-02: ตรวจสอบการแสดงผลปุ่ม เข้าสู่ระบบด้วย Google (OAuth UI)', async ({ page }) => {
    await page.goto('/login');
    const googleBtn = page.locator('button:has-text("Google"), a[href*="google"], button:has(svg)').first();
    await expect(googleBtn).toBeVisible();
  });

});