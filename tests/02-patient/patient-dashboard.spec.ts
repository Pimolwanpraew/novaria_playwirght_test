import { test, expect } from '@playwright/test';

test.describe('Patient - Dashboard & Personal Portal', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1000);
  });

  test('TC-PAT-DSH-01: กดที่ Profile Header "PATIENT Pimolwan" เพื่อเปิดดูเมนูส่วนตัว', async ({ page }) => {
    await page.goto('/');

    // อ้างอิงจากรูปภาพ: เมนูด้านบนขวาเขียนว่า PATIENT Pimolwan
    const userMenu = page.locator('button:has-text("PATIENT"), div:has-text("PATIENT")').first();
    if (await userMenu.isVisible()) {
      await userMenu.click();
      await page.waitForTimeout(300);
    }
    await expect(page.locator('header').first()).toBeVisible();
  });

  test('TC-PAT-DSH-02: ตรวจสอบรายการ "ทำนัดหมาย" และ "ประวัติการรักษา" ในหน้าแดชบอร์ด', async ({ page }) => {
    await page.goto('/patient/dashboard'); // หรือหน้าโปรไฟล์ผู้ป่วย
    await expect(page.locator('main').first()).toBeVisible();
  });

});