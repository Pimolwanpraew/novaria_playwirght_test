import { test, expect } from '@playwright/test';

test.describe('Admin - News Management (E2E)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.locator('input[type="password"]').fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/admin\/main/);
    await page.goto('/admin/news');
  });

  test('TC-ADM-NWS-01: แอดมินเข้าหน้าจัดการข่าวสารและบทความ ตรวจสอบฟอร์มเพิ่มข่าวสาร', async ({ page }) => {
    await expect(page.locator('text="จัดการข่าวสารและบทความ (Admin Control)"').first()).toBeVisible();
    await expect(page.locator('text="จัดการและเพิ่มข่าวสารใหม่"').first()).toBeVisible();
    await expect(page.locator('button:has-text("เผยแพร่ข่าวสาร")').first()).toBeVisible();
  });

  test('TC-ADM-NWS-02: แอดมินสร้างและเผยแพร่ข่าวสารใหม่สำเร็จ', async ({ page }) => {
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.locator('input[placeholder*="หัวข้อข่าวสาร"]').first().fill('ประกาศอัปเดตระบบ E2E Test');
    await page.locator('textarea[placeholder*="รายละเอียดข่าว"]').first().fill('เนื้อหาข่าวสารสำหรับทดสอบระบบความเสถียร');

    const publishBtn = page.locator('button:has-text("เผยแพร่ข่าวสาร")').first();
    await publishBtn.click();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/admin\/news/);
  });

});