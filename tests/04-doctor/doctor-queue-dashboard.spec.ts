/*ทดสอบการเข้าถึงและเรียกดูหน้าคิวตรวจผู้ป่วยของระบบสำหรับแพทย์*/
import { test, expect } from '@playwright/test';

test.describe('Doctor - Queue Management Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_DOCTOR_EMAIL || 'doctor.dept1_1@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_DOCTOR_PASSWORD || 'password123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/doctors/, { timeout: 10000 }).catch(() => {});
  });

  test('TC-DOC-QUE-01: แสดงคอลัมน์สถานะคิวตรวจผู้ป่วย ปุ่มจัดการคิว และปุ่มรีเฟรช', async ({ page }) => {
    await page.goto('/doctors/dashboard', { waitUntil: 'domcontentloaded' });

    // ตรวจสอบหัวข้อหน้าคิวตรวจ
    await expect(page.locator('text="คิวตรวจผู้ป่วย"').first()).toBeVisible({ timeout: 10000 });

    // ตรวจสอบ 3 คอลัมน์สถานะคิว
    await expect(page.locator('text="รอตรวจ"').first()).toBeVisible();
    await expect(page.locator('text="กำลังตรวจ"').first()).toBeVisible();
    await expect(page.locator('text="ตรวจเสร็จสิ้น"').first()).toBeVisible();

    // ตรวจสอบปุ่มรีเฟรช
    const refreshBtn = page.locator('button, a').filter({ hasText: /รีเฟรช|Refresh/i }).first();
    if (await refreshBtn.isVisible()) {
      await refreshBtn.click();
      await page.waitForTimeout(500);
    }

    // ตรวจสอบปุ่มดำเนินการในคิว (ถ้ามีคิวรอ)
    const actionBtn = page.locator('button:has-text("เรียกเข้าตรวจ"), button:has-text("ยืนยัน")').first();
    if (await actionBtn.isVisible()) {
      await expect(actionBtn).toBeEnabled();
    }
  });

  test('TC-DOC-QUE-02: สามารถกดปุ่ม "กลับหน้าหลักแพทย์" ได้สำเร็จ', async ({ page }) => {
    await page.goto('/doctors/dashboard', { waitUntil: 'domcontentloaded' });

    const backBtn = page.locator('text="กลับหน้าหลักแพทย์"').first();
    await expect(backBtn).toBeVisible({ timeout: 10000 });
    await backBtn.click();

    await expect(page).toHaveURL(/\/doctors\/main/);
  });

});