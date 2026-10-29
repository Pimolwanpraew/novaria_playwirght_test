import { test, expect } from '@playwright/test';

test.describe('Public - Health Info & Articles', () => {

  test('TC-PUB-ART-01: เรียกดูบทความข้อมูลสุขภาพและอ่านรายละเอียด', async ({ page }) => {
    await page.goto('/health-info'); // หน้าข้อมูลสุขภาพ

    const readMoreLink = page.locator('a:has-text("อ่านเพิ่มเติม")').first();
    if (await readMoreLink.isVisible()) {
      await readMoreLink.click();
    }
    await expect(page.locator('main').first()).toBeVisible();
  });

});