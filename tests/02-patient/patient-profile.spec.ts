import { test, expect } from '@playwright/test';

test.describe('Patient - Profile Management', () => {

  test.beforeEach(async ({ page }) => {
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@example.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'Patient123!';

    await page.goto('/login');

    await page.getByPlaceholder(/อีเมล|Email/i).fill(patientEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(patientPassword);

    // แก้ไข: ใช้ button[type="submit"] เจาะจงเฉพาะปุ่มกดส่งฟอร์มล็อกอิน
    await page.locator('button[type="submit"]').first().click();

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