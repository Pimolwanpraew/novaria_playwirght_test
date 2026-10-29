import { test, expect } from '@playwright/test';

test.describe('Admin - Analytics & System Audit Logs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    // 🎯 เปลี่ยนเป็น /admin/main
    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-REP-01: เรียกดูตัวเลขสรุป Dashboard บนหน้า Admin Portal', async ({ page }) => {
    await page.goto('/admin/main');
    await expect(page.locator('text="แดชบอร์ดสถิติ"').first()).toBeVisible();
  });

  test.skip('TC-ADM-REP-02: ตรวจสอบ Audit Log การเข้าใช้งานระบบของเจ้าหน้าที่ (ข้ามชั่วคราว)', async ({ page }) => {
    // ข้ามเนื่องจากหน้า Admin ปัจจุบันยังไม่มีโมดูล Audit Log
  });

});