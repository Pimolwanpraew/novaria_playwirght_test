import { test } from '@playwright/test';

test('Setup: สร้างบัญชี patient@novaria.com เข้าฐานข้อมูล', async ({ page }) => {
  await page.goto('/register', { waitUntil: 'networkidle' });

  // 1. กรอกข้อมูลส่วนตัว
  await page.getByPlaceholder(/กรอกชื่อจริง|ชื่อ/i).first().fill('สมชาย');
  await page.getByPlaceholder(/กรอกนามสกุล|นามสกุล/i).first().fill('ใจดี');
  
  // กรอกเลขบัตรและเบอร์โทรที่ยังไม่มีในระบบ
  const citizenInput = page.getByPlaceholder(/13 หลัก|บัตรประชาชน/i).first();
  const phoneInput = page.getByPlaceholder(/10 หลัก|เบอร์โทรศัพท์/i).first();

  if (await citizenInput.isVisible()) await citizenInput.fill('1100100999999');
  if (await phoneInput.isVisible()) await phoneInput.fill('0899999999');

  // 2. กรอก Credentials หลักที่ใช้ทดสอบ
  await page.locator('input[type="email"], input[name="email"]').first().fill('patient@novaria.com');
  await page.locator('input[type="password"], input[name="password"]').first().fill('patient123');

  const confirmPass = page.locator('input[name="confirmPassword"], input[placeholder*="ยืนยัน"]').first();
  if (await confirmPass.isVisible()) {
    await confirmPass.fill('patient123');
  }

  // 3. กดสมัคร
  await page.locator('button[type="submit"], button:has-text("สมัคร")').first().click();
  await page.waitForTimeout(2000);
});