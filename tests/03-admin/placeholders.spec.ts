/*ทดสอบการเข้าถึงและเรียกดูหน้าจัดการฟีเจอร์ขั้นสูงและระบบตรวจสอบของระบบสำหรับแอดมิน*/
import { test, expect } from '@playwright/test';

test.describe('Admin - Advanced & System Audit Features', () => {

  test.skip('TC-ADM-REP-02: ตรวจสอบ Audit Log และประวัติการใช้งานของผู้ดูแลระบบ', async ({ page }) => {
    // ข้ามการทดสอบชั่วคราว เนื่องจากระบบยังไม่ได้ Implement โมดูล Audit Log
  });

  test.skip('TC-ADM-SET-01: ตั้งค่าข้อมูลพื้นฐานของโรงพยาบาล (Hospital Settings)', async ({ page }) => {
    // ข้ามการทดสอบชั่วคราว เนื่องจากระบบยังไม่มีหน้าการตั้งค่าโรงพยาบาล
  });

  test.skip('TC-ADM-DOC-03: จัดการวันลาพักงานของแพทย์ (Doctor Leave Schedule)', async ({ page }) => {
    // ข้ามการทดสอบชั่วคราว เนื่องจากฟังก์ชันการอนุมัติวันลายังอยู่ในแผนพัฒนา
  });

});