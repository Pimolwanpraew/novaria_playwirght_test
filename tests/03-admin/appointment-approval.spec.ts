import { test, expect } from '@playwright/test';

test.describe('Admin - Appointment Management Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    // 🎯 เปลี่ยนเป็น /admin/main
    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-APT-01: แอดมินพบเมนู "จัดการและจัดสรรคิว" บนหน้า Admin Main Portal', async ({ page }) => {
    await page.goto('/admin/main');
    
    // ตรวจสอบการ์ดจัดการคิวบน UI จริง
    const queueCard = page.locator('text="จัดการและจัดสรรคิว"').first();
    await expect(queueCard).toBeVisible();
  });

});