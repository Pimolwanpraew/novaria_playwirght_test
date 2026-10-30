/*ทดสอบการเข้าถึงและเรียกดูหน้าจัดการผู้ใช้งานของระบบสำหรับแอดมิน*/
import { test, expect } from '@playwright/test';

test.describe('Admin - User Management Control (E2E)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/admin\/main/);
    await page.goto('/admin/users');
  });

  test('TC-ADM-USR-01: แอดมินเข้าหน้าจัดการผู้ใช้งานในระบบ ตรวจสอบตารางรายชื่อผู้ใช้และช่องค้นหา', async ({ page }) => {
    await expect(page.locator('text="จัดการผู้ใช้งานในระบบ (Users Management)"').first()).toBeVisible();
    await expect(page.locator('text=/รายชื่อผู้ใช้งานทั้งหมด/i').first()).toBeVisible();
    await expect(page.locator('input[placeholder*="ค้นหาด้วยชื่อ"]').first()).toBeVisible();
  });

  test('TC-ADM-USR-02: ระบบสามารถค้นหาผู้ใช้งานจาก ชื่อ หรือ อีเมล ได้ถูกต้อง', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="ค้นหาด้วยชื่อ"]').first();
    await searchInput.fill('Admin Novaria');
    await page.waitForTimeout(500);

    const tableRow = page.locator('table tbody tr').first();
    await expect(tableRow).toContainText('Admin Novaria');
  });

  test('TC-ADM-USR-03: แอดมินสามารถกดปุ่มลบผู้ใช้งาน และยืนยันการลบได้', async ({ page }) => {
    // 🟢 แก้ไข: ดักจับ Alert dialog ของ Browser
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    const deleteBtn = page.locator('button, a').filter({ hasText: 'ลบ' }).first();
    await deleteBtn.click();
    
    // ตรวจสอบว่ามี Alert เด้งขึ้นมาจริง
    await page.waitForTimeout(1000);
    expect(alertMessage.length).toBeGreaterThan(0);
  });

});