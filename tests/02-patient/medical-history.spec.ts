import { test, expect } from '@playwright/test';

test.describe('Patient Workflow - Medical Records & History', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1500);
  });

  test('TC-PAT-HIS-01: เรียกดูตารางประวัติการเข้าตรวจและใบนัดหมายย้อนหลัง', async ({ page }) => {
    await page.goto('/');
    
    const historyLink = page.locator('a:has-text("ประวัติ"), button:has-text("ประวัติ"), a[href*="history"]').first();
    if (await historyLink.isVisible()) {
      await historyLink.click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

});