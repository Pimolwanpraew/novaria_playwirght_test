import { test, expect } from '@playwright/test';

test.describe('Admin - Appointment Management Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/dashboard/);
  });

  // -------------------------------------------------------------------------
  // 🟢 TC-ADM-APT: การจัดการนัดหมาย
  // -------------------------------------------------------------------------
  test('TC-ADM-APT-01: แอดมินตรวจสอบคิวนัดหมายทั้งหมดประจำวันบน Dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    // ตรวจสอบพื้นที่แสดงคิวนัดหมายบน Dashboard
    const appointmentSection = page.locator('main section, div:has-text("นัดหมาย"), table').first();
    await expect(appointmentSection).toBeVisible();
  });

});