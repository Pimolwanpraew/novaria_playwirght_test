import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// โหลดค่า Environment Variables จากไฟล์ .env และบังคับ override ค่าเดิม
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // กำหนดสคริปต์รันสร้างผู้ใช้งานอัตโนมัติก่อนเริ่มรัน 129 เทสทั้งหมด
  globalSetup: path.resolve(__dirname, 'tests/global-setup.ts'),

  // กำหนดโฟลเดอร์เก็บไฟล์ทดสอบ
  testDir: './tests',
  
  // ปิด fullyParallel เพื่อป้องกันปัญหา Session การล็อกอินตีกัน
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  // บังคับให้รันทีละ 1 worker เสมอ เพื่อความเสถียรของ State ระบบ
  workers: 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL หลักของแพลตฟอร์ม */
    baseURL: 'https://novaria-hospital.tech',

    /* บันทึก trace เมื่อทดสอบล้มเหลวเพื่อใช้แก้บั๊ก */
    trace: 'on-first-retry',

    /* ตั้งค่า Timeout ย่อยสำหรับการค้นหา Element */
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* ตั้งค่า Timeout รวมต่อ 1 Test Case (30 วินาที) */
  timeout: 30000,

  /* กำหนดรันเฉพาะ Chromium เป็นหลักเพื่อประหยัดทรัพยากร */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});