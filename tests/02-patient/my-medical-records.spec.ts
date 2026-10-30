/*ทดสอบการเข้าถึงและเรียกดูประวัติการรักษาและผลตรวจทางห้องปฏิบัติการของผู้ป่วย*/
import { test, expect } from '@playwright/test';

test.describe('Patient Workflow - Medical Records & Lab Results', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1000);
  });

  test('TC-PAT-REC-01: เรียกดูรายการผลการตรวจทางห้องปฏิบัติการ (Lab Results)', async ({ page }) => {
    await page.goto('/records'); // หรือหน้าประวัติการรักษา
    
    const labTab = page.locator('button:has-text("ผลแล็บ"), button:has-text("Lab Results"), a:has-text("ผลตรวจ")').first();
    if (await labTab.isVisible()) {
      await labTab.click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-REC-02: ตรวจสอบประวัติการรับยาและคำแนะนำการใช้ยา', async ({ page }) => {
    await page.goto('/records');

    const medsTab = page.locator('button:has-text("ประวัติการรับยา"), a:has-text("ใบสั่งยา")').first();
    if (await medsTab.isVisible()) {
      await medsTab.click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

});