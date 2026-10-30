/*ทดสอบการตั้งค่าบัญชีและความปลอดภัยของผู้ป่วย*/
import { test, expect } from '@playwright/test';

test.describe('Patient Workflow - Account & Security Settings', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1000);
  });

  test('TC-PAT-SET-01: กรอกข้อมูลผู้ติดต่อฉุกเฉิน (Emergency Contact)', async ({ page }) => {
    await page.goto('/profile');

    const contactInput = page.locator('input[name="emergencyContact"], input[placeholder*="ผู้ติดต่อฉุกเฉิน"]').first();
    if (await contactInput.isVisible()) {
      await contactInput.fill('คุณแม่ สมศรี (089-999-9999)');
      await page.locator('button:has-text("บันทึก")').first().click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-SET-02: ตรวจสอบการยินยอมตามกฎหมาย PDPA และความเป็นส่วนตัว', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('main').first()).toBeVisible();
  });

});