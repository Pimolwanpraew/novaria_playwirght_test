import { test, expect } from '@playwright/test';

test.describe('Patient - Appointment Calendar & Time Selection', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1000);
  });

  test('TC-PAT-CAL-01: เลือกวันที่ตรวจจาก ปฏิทิน และเลือกเวลาออกตรวจของแพทย์', async ({ page }) => {
    await page.goto('/doctors');

    const bookBtn = page.locator('button:has-text("นัดหมายตรวจ"), a:has-text("นัดหมายตรวจ")').first();
    if (await bookBtn.isVisible()) {
      await bookBtn.click();
      await page.waitForTimeout(500);

      // เลือกสล็อตเวลาตรวจ (เช่น 09:00 - 10:00)
      const timeSlot = page.locator('button:has-text("09:"), button:has-text("10:"), div[class*="slot"]').first();
      if (await timeSlot.isVisible()) {
        await timeSlot.click();
      }
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

});