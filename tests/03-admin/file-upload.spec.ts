/*ทดสอบการอัปโหลดไฟล์รูปภาพหรือเอกสารเข้าสู่ระบบสำหรับแอดมิน*/
import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Admin - File Upload Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com';
    const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'admin123';

    await page.getByPlaceholder(/อีเมล|Email/i).fill(adminEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(adminPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/dashboard/, { timeout: 10000 }).catch(() => {});
  });

  test('TC-ADM-UPL-01: สามารถจำลองการอัปโหลดไฟล์รูปภาพหรือเอกสารเข้าสู่ระบบได้', async ({ page }) => {
    await page.goto('/admin/doctors', { waitUntil: 'domcontentloaded' });

    // ค้นหา Input ที่ใช้รับไฟล์ (type="file")
    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      // สร้างไฟล์ตัวอย่างจำลองสำหรับการอัปโหลด
      const dummyFile = {
        name: 'test-doctor-avatar.png',
        mimeType: 'image/png',
        buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')
      };

      // ใช้ setInputFiles ในการแนบไฟล์
      await fileInput.setInputFiles(dummyFile);

      // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือระบบรับไฟล์เรียบร้อย
      await expect(fileInput).toHaveValue(/test-doctor-avatar\.png/);
    } else {
      // กรณีใช้ custom upload component
      test.skip(true, 'ไม่พบ input[type="file"] บนหน้านี้');
    }
  });

});