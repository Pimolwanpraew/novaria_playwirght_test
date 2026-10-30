/*ทดสอบหน้าบทความและสาระสุขภาพ*/
import { test, expect } from '@playwright/test';

const READ_MORE = 'ดูข้อมูลเพิ่มเติม';
const EMPTY_ARTICLES = /ยังไม่มี.*บทความ/;

test.describe('ทดสอบหน้าบทความและสาระสุขภาพ', () => {

  // เดิม: hardcode ว่าต้องมีบทความ "ความดันโลหิตสูง" -> ล้มทันทีถ้าข้อมูลในระบบเปลี่ยน/ว่าง
  // ใหม่: ตรวจหัวข้อหน้า + ต้องมี "รายการบทความ" หรือ "ข้อความว่าง" อย่างใดอย่างหนึ่ง
  test('TC-ART-01: หน้า /health แสดงหัวข้อบทความสุขภาพ และรายการบทความหรือข้อความว่าง', async ({ page }) => {
    await page.goto('/health');

    await expect(page.locator('h1', { hasText: /บทความ.*สุขภาพ/ })).toBeVisible();

    const readMore = page.getByText(READ_MORE).first();
    const emptyState = page.getByText(EMPTY_ARTICLES).first();
    await expect(readMore.or(emptyState)).toBeVisible({ timeout: 10000 });
  });

  // เดิม: คลิกแล้วจบ ไม่ตรวจอะไรหลังคลิก
  // ใหม่: หลังคลิกต้องเกิดการเปลี่ยนแปลงจริง (URL เปลี่ยน หรือเปิด dialog)
  test('TC-ART-02: คลิก "ดูข้อมูลเพิ่มเติม" แล้วเข้าสู่รายละเอียดบทความ', async ({ page }) => {
    await page.goto('/health');
    await expect(page.locator('h1', { hasText: /บทความ.*สุขภาพ/ })).toBeVisible();

    const readMore = page.getByText(READ_MORE).first();
    const hasArticles = await readMore
      .waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true)
      .catch(() => false);

    test.skip(!hasArticles, 'ไม่มีบทความสุขภาพในระบบ จึงทดสอบการเปิดอ่านบทความไม่ได้ — เพิ่มข้อมูลบทความก่อน');

    const listUrl = page.url();
    await readMore.click();

    await expect
      .poll(
        async () => page.url() !== listUrl || (await page.getByRole('dialog').isVisible()),
        { timeout: 10000, message: 'หลังคลิกต้องเปลี่ยน URL หรือเปิด dialog รายละเอียดบทความ' }
      )
      .toBeTruthy();
  });

});