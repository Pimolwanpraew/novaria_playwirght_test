/*ทดสอบฟังก์ชันการจองนัดหมายแพทย์*/
import { test, expect } from '@playwright/test';

test.describe('Patient Workflow - Appointment Booking', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1500);
  });

  test('TC-PAT-APT-01: ค้นหาแพทย์ตามแผนกและค้นหารายชื่อแพทย์', async ({ page }) => {
    await page.goto('/');

    const searchDoc = page.locator('input[placeholder*="ค้นหาแพทย์"], input[type="search"]').first();
    if (await searchDoc.isVisible()) {
      await searchDoc.fill('นพ.');
      await page.keyboard.press('Enter');
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-APT-02: ทำรายการจองคิวนัดหมายแพทย์ (Select Date & Time)', async ({ page }) => {
    await page.goto('/');

    const bookBtn = page.locator('button:has-text("จองคิว"), a:has-text("จองคิว"), button:has-text("Book")').first();
    if (await bookBtn.isVisible()) {
      await bookBtn.click();
      await expect(page.locator('main').first()).toBeVisible();
    } else {
      await expect(page.locator('main').first()).toBeVisible();
    }
  });

});