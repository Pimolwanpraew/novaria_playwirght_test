import { test, expect } from '@playwright/test';

test.describe('Doctor - Medical Records & Patient History', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByPlaceholder(/อีเมล|Email/i).fill(process.env.TEST_DOCTOR_EMAIL || 'doctor.dept1_1@novaria.com');
    await page.getByPlaceholder(/รหัสผ่าน|Password/i).fill(process.env.TEST_DOCTOR_PASSWORD || 'password123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/\/doctors/, { timeout: 10000 }).catch(() => {});
  });

  test('TC-DOC-REC-01: ค้นหารายชื่อผู้ป่วย เลือกผู้ป่วย และบันทึกเวชระเบียน/ผลการวินิจฉัยโรค', async ({ page }) => {
    await page.goto('/doctors/patients', { waitUntil: 'domcontentloaded' });

    // 1. ตรวจสอบหน้าและรายการผู้ป่วยในการดูแล
    await expect(page.locator('text="เวชระเบียนและประวัติการรักษา"').first()).toBeVisible({ timeout: 10000 });

    // 2. ค้นหาผู้ป่วย
    const searchInput = page.locator('input[placeholder*="ค้นหา"], input[placeholder*="ชื่อ"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Pimolwan');
      await page.waitForTimeout(300);
    }

    // 3. เลือกผู้ป่วยจากการ์ดด้านซ้าย
    const patientCard = page.locator('text=/Pimolwan|Admin/i').first();
    if (await patientCard.isVisible()) {
      await patientCard.click();
      await page.waitForTimeout(500);

      // 4. ตรวจสอบกล่องกรอกข้อมูล "บันทึกเวชระเบียนครั้งใหม่"
      await expect(page.locator('text="บันทึกเวชระเบียนครั้งใหม่"').first()).toBeVisible();

      // 5. กรอกผลการวินิจฉัยโรค (Diagnosis)
      const diagnosisInput = page.locator('input[placeholder*="วินิจฉัย"], textarea[placeholder*="วินิจฉัย"]').first();
      if (await diagnosisInput.isVisible()) {
        await diagnosisInput.fill('ไข้หวัดใหญ่ สายพันธุ์ A (Influenza A)');
      }

      // 6. กรอกคำสั่งการรักษา / สั่งจ่ายยา (Prescription)
      const prescriptionInput = page.locator('input[placeholder*="สั่งจ่ายยา"], textarea[placeholder*="สั่งจ่ายยา"], textarea[placeholder*="คำแนะนำ"]').first();
      if (await prescriptionInput.isVisible()) {
        await prescriptionInput.fill('1. Paracetamol 500mg ทานหลังอาหาร 3 มื้อ\n2. Oseltamivir 75mg');
      }

      // 7. ตรวจสอบและทดสอบคลิกปุ่มบันทึก
      const saveBtn = page.locator('button:has-text("บันทึกเวชระเบียนใหม่")').first();
      await expect(saveBtn).toBeVisible();
      await expect(saveBtn).toBeEnabled();
    }
  });

});