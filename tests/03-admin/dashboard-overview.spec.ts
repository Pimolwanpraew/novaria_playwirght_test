import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard - Overview & Portal Menu', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_ADMIN_EMAIL || 'admin@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_ADMIN_PASSWORD || 'admin123');
    await page.locator('button[type="submit"]').first().click();

    // 🎯 อัปเดต URL เป็น /admin/main ตาม UI จริง
    await page.waitForURL(/\/admin\/main/);
  });

  test('TC-ADM-DASH-01: โหลดหน้า Admin Portal สำเร็จ และแสดงข้อความต้อนรับ Admin', async ({ page }) => {
    await page.goto('/admin/main');

    // ตรวจสอบข้อความต้อนรับ Admin
    await expect(page.locator('text=/สวัสดี.*Admin/i').first()).toBeVisible();
    
    // ตรวจสอบส่วนเมนูหลัก
    await expect(page.locator('text="จัดการข้อมูลโรงพยาบาล"').first()).toBeVisible();
  });

  test('TC-ADM-DASH-02: ตรวจสอบการแสดงผลการ์ดเมนูหลัก (แดชบอร์ดสถิติ & จัดการและจัดสรรคิว)', async ({ page }) => {
    await page.goto('/admin/main');

    const statsCard = page.locator('text="แดชบอร์ดสถิติ"').first();
    const queueCard = page.locator('text="จัดการและจัดสรรคิว"').first();

    await expect(statsCard).toBeVisible();
    await expect(queueCard).toBeVisible();
  });

});