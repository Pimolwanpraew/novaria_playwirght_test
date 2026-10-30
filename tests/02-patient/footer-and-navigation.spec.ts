/*ทดสอบส่วนท้ายและการนำทางของเว็บไซต์สำหรับผู้ป่วย*/
import { test, expect } from '@playwright/test';

test.describe('Public - Footer Links & Accreditations', () => {

  test('TC-PUB-FTR-01: ตรวจสอบตรารับรองมาตรฐาน (JCI, CAMTS, HA) ด้านล่างสุดของเว็บไซต์', async ({ page }) => {
    await page.goto('/');

    // เลื่อนลงล่างสุด
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // ตรวจสอบข้อความมาตรฐาน JCI
    await expect(page.locator('body')).toContainText('GOLD SEAL OF APPROVAL');
  });

  // เดิม: หา <button> "รับข่าวสาร/ข้อเสนอแนะ" แต่บนเว็บจริงเป็นลิงก์ (<a>) -> ไม่เจอ แล้ว if ข้ามไปเฉยๆ เทสจึงผ่านโดยไม่ได้ตรวจอะไร
  // ใหม่: ใช้ role=link, ต้องมองเห็นจริง, คลิกแล้วต้องไปหน้าปลายทางที่ถูกต้อง
  test('TC-PUB-FTR-02: ลิงก์ "รับข่าวสาร" และ "ข้อเสนอแนะ" ในส่วน "ติดตามข่าวสารสุขภาพ" พาไปหน้าที่ถูกต้อง', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const sectionTitle = page.getByText('ติดตามข่าวสารสุขภาพ').first();
    await sectionTitle.scrollIntoViewIfNeeded();
    await expect(sectionTitle).toBeVisible();

    // 1) รับข่าวสาร -> /news
    const subscribe = page.getByRole('link', { name: 'รับข่าวสาร', exact: true }).first();
    await expect(subscribe).toBeVisible();
    await subscribe.click();
    await expect(page).toHaveURL(/\/news\/?$/, { timeout: 15000 });

    // 2) ข้อเสนอแนะ -> /contact
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const feedback = page.getByRole('link', { name: 'ข้อเสนอแนะ', exact: true }).first();
    await feedback.scrollIntoViewIfNeeded();
    await expect(feedback).toBeVisible();
    await feedback.click();
    await expect(page).toHaveURL(/\/contact\/?$/, { timeout: 15000 });
  });

});