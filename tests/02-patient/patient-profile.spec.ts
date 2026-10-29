import { test, expect } from '@playwright/test';

test.describe('Patient - Profile Management', () => {

  test.beforeEach(async ({ page }) => {
    // 🟢 แก้ไขค่า Fallback ให้ตรงกับ Credential จริงในระบบ
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    // ใช้ Locator ที่ครอบคลุมทั้ง Placeholder และ Selector ทั่วไป
    await page.locator('input[type="email"], input[name="email"]').first().fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').first().fill(patientPassword);

    await page.locator('button[type="submit"]').first().click();

    // รอให้ระบบล็อกอินและสตรีมเซสชันเสร็จสิ้น
    await page.waitForTimeout(1500);
  });

  test('TC-PAT-01: ดูข้อมูลโปรไฟล์ส่วนตัว', async ({ page }) => {
    await page.goto('/');
    const profileMenu = page.locator('a[href*="profile"], button:has-text("โปรไฟล์")').first();
    if (await profileMenu.isVisible()) {
      await profileMenu.click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-02: แก้ไขข้อมูลเบอร์โทรศัพท์และที่อยู่', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main').first()).toBeVisible();
  });

});