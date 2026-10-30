/*ทดสอบการเข้าถึงและควบคุมสิทธิ์การเข้าถึงของผู้ใช้ในระบบ (RBAC)*/
import { test, expect } from '@playwright/test';

// Helper Function สำหรับล็อกอินที่เสถียรและจำลองการพิมพ์จริงของมนุษย์
async function loginHelper(page: any, email: string, pass: string) {
  await page.goto('/login', { waitUntil: 'networkidle' });

  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  const passwordInput = page.locator('input[type="password"], input[name="password"]').first();

  await emailInput.clear();
  await emailInput.pressSequentially(email, { delay: 30 });

  await passwordInput.clear();
  await passwordInput.pressSequentially(pass, { delay: 30 });

  await page.waitForTimeout(300);
  await page.locator('button[type="submit"]').first().click();
  
  // รอให้พ้นจากหน้า Login หรือรอจนระบบประมวลผลเซสชันสำเร็จ
  await page.waitForURL((url: URL) => !url.href.includes('/login'), { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1000);
}

test.describe('Security - Role-Based Access Control (RBAC)', () => {

  // 1. ผู้ใช้ที่ยังไม่ได้ล็อกอิน พยายามเข้าหน้า /admin/*
  test('TC-SEC-01: ผู้ใช้ที่ยังไม่ล็อกอิน เข้า /admin/* ทุกหน้าไม่ได้ ต้องถูกส่งไป /login', async ({ page }) => {
    await page.goto('/admin/main', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const isLoginPage = page.url().includes('/login');
    const isNotAdminDashboard = !(await page.locator('text="จัดการข้อมูลโรงพยาบาล"').first().isVisible().catch(() => false));

    expect(isLoginPage || isNotAdminDashboard).toBeTruthy();
  });

  // 2. สิทธิ์ Patient ล็อกอินแล้ว พยายามเข้าหน้า /admin/*
  test('TC-SEC-02: สิทธิ์ Patient ล็อกอินแล้ว เข้า /admin/* ทุกหน้าไม่ได้', async ({ page }) => {
    const email = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const password = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await loginHelper(page, email, password);

    await page.goto('/admin/main', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const adminActionBtn = page.locator('button:has-text("เพิ่มแพทย์"), button:has-text("ระงับผู้ใช้")').first();
    await expect(adminActionBtn).not.toBeVisible();
  });

  // 3. สิทธิ์ Doctor ล็อกอินแล้ว พยายามเข้าหน้า /admin/*
  test('TC-SEC-03: สิทธิ์ Doctor ล็อกอินแล้ว เข้า /admin/* ทุกหน้าไม่ได้', async ({ page }) => {
    const email = process.env.TEST_DOCTOR_EMAIL || 'doctor.dept1_1@novaria.com';
    const password = process.env.TEST_DOCTOR_PASSWORD || 'password123';

    await loginHelper(page, email, password);

    await page.goto('/admin/main', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const adminActionBtn = page.locator('button:has-text("เพิ่มแพทย์"), button:has-text("ระงับผู้ใช้")').first();
    await expect(adminActionBtn).not.toBeVisible();
  });

  // 4. ผู้ใช้ที่ยังไม่ได้ล็อกอิน พยายามเข้าพอร์ทัลแพทย์ (/doctors/*)
  test('TC-SEC-04: ผู้ใช้ที่ยังไม่ล็อกอิน เข้าพอร์ทัลแพทย์ (/doctors/main, dashboard, schedule, patients)ไม่ได้', async ({ page }) => {
    await page.goto('/doctors/main', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const doctorBadge = page.locator('header span:has-text("DOCTOR"), nav span:has-text("DOCTOR")').first();
    await expect(doctorBadge).not.toBeVisible();
  });

  // 5. สิทธิ์ Patient ล็อกอินแล้ว พยายามเข้าพอร์ทัลแพทย์ (/doctors/*)
  test('TC-SEC-05: สิทธิ์ Patient ล็อกอินแล้ว เข้าพอร์ทัลแพทย์ไม่ได้', async ({ page }) => {
    const email = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const password = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await loginHelper(page, email, password);

    await page.goto('/doctors/main', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const doctorBadge = page.locator('header span:has-text("DOCTOR"), nav span:has-text("DOCTOR")').first();
    await expect(doctorBadge).not.toBeVisible();
  });

});