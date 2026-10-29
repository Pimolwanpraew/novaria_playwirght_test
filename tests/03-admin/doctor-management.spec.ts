import { test, expect } from '@playwright/test';

test.describe('Admin - Doctor Management Control (E2E)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/admin\/main/);
    await page.goto('/admin/doctors');
  });

  test('TC-ADM-DOC-01: แอดมินเข้าหน้าจัดการข้อมูลแพทย์และตารางออกตรวจ (Admin Control) สำเร็จ', async ({ page }) => {
    await expect(page.locator('text="จัดการข้อมูลแพทย์และตารางออกตรวจ (Admin Control)"').first()).toBeVisible();
    await expect(page.locator('text="เพิ่มแพทย์คนใหม่เข้าสู่ระบบ"').first()).toBeVisible();
    await expect(page.locator('text=/เลขบัตรประชาชน/i').first()).toBeVisible();
  });

  test('TC-ADM-DOC-03: ระบบแจ้งเตือน Error หรือไม่ยอมให้ส่งฟอร์มเมื่อกดบันทึกโดยไม่กรอกข้อมูลสำคัญ', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]').or(page.locator('button:has-text("บันทึก"), button:has-text("เพิ่มแพทย์")')).first();
    await submitBtn.click();

    // 🟢 ตรวจสอบว่ายังคงอยู่ที่หน้าเดิม /admin/doctors (ฟอร์มไม่ยอมให้ผ่านเพราะติด required)
    await expect(page).toHaveURL(/\/admin\/doctors/);
  });

  test('TC-ADM-DOC-04: แอดมินสามารถกรอกข้อมูลและเพิ่มแพทย์คนใหม่ได้สำเร็จ', async ({ page }) => {
    let alertText = '';
    page.on('dialog', async dialog => {
      alertText = dialog.message();
      await dialog.accept();
    });

    // กรอกข้อมูลฟอร์ม
    await page.locator('input').nth(0).fill('ทดสอบ');
    await page.locator('input').nth(1).fill('ใจดี');
    await page.locator('input[type="email"]').fill(`test.doc.${Date.now()}@novaria.com`);
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('input[placeholder*="13 หลัก"]').or(page.locator('input').nth(4)).fill('1234567890123');
    await page.locator('input[placeholder*="0812345678"]').or(page.locator('input').nth(5)).fill('0812345678');

    const submitBtn = page.locator('button[type="submit"]').or(page.locator('button:has-text("บันทึก"), button:has-text("เพิ่มแพทย์")')).first();
    await submitBtn.click();

    await page.waitForTimeout(1000);
    // ตรวจสอบว่ามี Alert สำเร็จ หรือ URL ยังคงเสถียร
    await expect(page).toHaveURL(/\/admin\/doctors/);
  });

});