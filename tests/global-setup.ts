import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseURL = config.projects[0].use.baseURL || 'https://novaria-hospital.tech';

  try {
    await page.goto(`${baseURL}/register`, { waitUntil: 'networkidle' });

    const firstName = page.getByPlaceholder(/กรอกชื่อจริง|ชื่อ/i).first();
    if (await firstName.isVisible()) {
      await firstName.fill('สมชาย');
      await page.getByPlaceholder(/กรอกนามสกุล|นามสกุล/i).first().fill('ใจดี');

      const citizen = page.getByPlaceholder(/13 หลัก|บัตรประชาชน/i).first();
      const phone = page.getByPlaceholder(/10 หลัก|เบอร์โทรศัพท์/i).first();
      if (await citizen.isVisible()) await citizen.fill('1100100999999');
      if (await phone.isVisible()) await phone.fill('0899999999');

      await page.locator('input[type="email"], input[name="email"]').first().fill('patient@novaria.com');
      await page.locator('input[type="password"], input[name="password"]').first().fill('patient123');

      const confirmPass = page.locator('input[name="confirmPassword"], input[placeholder*="ยืนยัน"]').first();
      if (await confirmPass.isVisible()) await confirmPass.fill('patient123');

      await page.locator('button[type="submit"], button:has-text("สมัคร")').first().click();
      await page.waitForTimeout(2000);
    }
  } catch (e) {
    // บัญชีอาจจะมีอยู่แล้วในฐานข้อมูล สามารถข้ามได้
  } finally {
    await browser.close();
  }
}

export default globalSetup;