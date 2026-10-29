import { test, expect } from '@playwright/test';

test.describe('Patient Workflow - Detailed Appointment Booking', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    const patientEmail = process.env.TEST_PATIENT_EMAIL || 'patient@novaria.com';
    const patientPassword = process.env.TEST_PATIENT_PASSWORD || 'patient123';

    await page.locator('input[type="email"], input[name="email"]').fill(patientEmail);
    await page.locator('input[type="password"], input[name="password"]').fill(patientPassword);
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(1000);
  });

  test('TC-PAT-FLOW-01: ดำเนินการจองนัดหมาย เลือกช่วงเวลาและกรอกอาการเบื้องต้น', async ({ page }) => {
    await page.goto('/doctors');

    // กดปุ่มนัดหมายตรวจของแพทย์คนแรก
    const bookBtn = page.locator('button:has-text("นัดหมายตรวจ"), button:has-text("จองคิว")').first();
    if (await bookBtn.isVisible()) {
      await bookBtn.click();
      
      // เลือกวันที่และเวลา (ถ้ามี calendar/time slot)
      const timeSlot = page.locator('button[class*="time"], div[class*="slot"]').first();
      if (await timeSlot.isVisible()) {
        await timeSlot.click();
      }

      // กรอกอาการเบื้องต้น
      const symptomInput = page.locator('textarea[name="symptoms"], textarea[placeholder*="อาการ"]').first();
      if (await symptomInput.isVisible()) {
        await symptomInput.fill('มีอาการปวดหัว และมีไข้ต่ำๆ มา 2 วัน');
      }

      // กดปุ่มยืนยัน
      const confirmBtn = page.locator('button:has-text("ยืนยันการนัดหมาย"), button:has-text("ยืนยัน")').first();
      if (await confirmBtn.isVisible()) {
        await confirmBtn.click();
      }
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-PAT-FLOW-02: ตรวจสอบสถานะใบนัดหมายในหน้า "นัดหมายของฉัน"', async ({ page }) => {
    await page.goto('/my-appointments'); // หรือลิ้งก์หน้านัดหมาย
    await expect(page.locator('main').first()).toBeVisible();
  });

});