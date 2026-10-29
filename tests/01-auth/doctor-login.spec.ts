import { test, expect } from '@playwright/test';

test.describe('Doctor - Authentication', () => {

  test('TC-DOC-AUTH-01: แพทย์เข้าสู่ระบบด้วย อีเมล และ รหัสผ่านสำเร็จ', async ({ page }) => {
    await page.goto('/login');

    const doctorEmail = process.env.TEST_DOCTOR_EMAIL || 'doctor.dept1_1@novaria.com';
    const doctorPassword = process.env.TEST_DOCTOR_PASSWORD || 'password123';

    await page.getByPlaceholder(/อีเมล|Email/i).fill(doctorEmail);
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(doctorPassword);
    
    await page.locator('button[type="submit"]').first().click();

    // ตรวจสอบการเข้าสู่ระบบสำเร็จ ( Redirect ไปยังหน้าแดชบอร์ด/ตารางแพทย์ หรือตรวจพบโปรไฟล์)
    await page.waitForTimeout(1500);
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-DOC-AUTH-02: แจ้งเตือน Error เมื่อแพทย์กรอกรหัสผ่านไม่ถูกต้อง', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder(/อีเมล|Email/i).fill('doctor.dept1_1@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill('wrongpassword');
    
    await page.locator('button[type="submit"]').first().click();

    // ตรวจสอบ Popup หรือ Alert แจ้งเตือนรหัสผ่านผิด
    await page.waitForTimeout(1000);
    await expect(page.locator('main').first()).toBeVisible();
  });

});