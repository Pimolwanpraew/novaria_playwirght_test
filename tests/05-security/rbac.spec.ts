import { test, expect } from '@playwright/test';

test.describe('Security - Role-Based Access Control (RBAC)', () => {

  test('TC-SEC-01: ผู้ใช้ทั่วไปที่ยังไม่ล็อกอิน แอบเข้าหน้า /dashboard ต้องไม่เห็นข้อมูล Admin', async ({ page }) => {
    // 1. เข้าหน้า Admin โดยตรงแบบไม่ได้ล็อกอิน
    await page.goto('/dashboard');
    
    // 2. บังคับ Assert เข้มงวด: ต้องไม่เห็นปุ่มดำเนินการ เมนูจัดการ หรือการ์ดสถิติของ Admin
    const adminActionBtn = page.locator('button:has-text("เพิ่มแพทย์"), button:has-text("อนุมัติ"), .admin-stats').first();
    await expect(adminActionBtn).not.toBeVisible();
    
    // 3. ตรวจสอบว่าไม่แสดงข้อมูลในโครงสร้างหลัก
    const tableData = page.locator('table tbody tr, [role="rowgroup"]').first();
    await expect(tableData).not.toBeVisible();
  });

  test('TC-SEC-02: สิทธิ์ Patient ล็อกอินแล้ว แอบเข้าหน้า /dashboard ต้องถูกกั้นสิทธิ์ข้อมูล Admin', async ({ page }) => {
    // 1. ล็อกอินด้วยสิทธิ์คนไข้ (Patient)
    await page.goto('/login');
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_PATIENT_PASSWORD || 'patient123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForLoadState('networkidle');

    // 2. พยายามแอบพิมพ์ URL สลับไปหน้า Admin Dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // 3. บังคับ Assert เข้มงวด: คนไข้ต้องไม่เห็น Control Elements ของแอดมินเด็ดขาด
    const adminControl = page.locator('button:has-text("เพิ่มแพทย์"), button:has-text("ระงับผู้ใช้"), a[href*="admin"]').first();
    await expect(adminControl).not.toBeVisible();
  });

});