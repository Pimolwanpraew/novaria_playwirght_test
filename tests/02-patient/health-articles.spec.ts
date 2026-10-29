import { test, expect } from '@playwright/test';

test.describe('ทดสอบหน้าบทความและสาระสุขภาพ', () => {
  test('TC-ART-01: ผู้ใช้สามารถเข้าสู่หน้าบทความสุขภาพและเห็นรายการบทความ', async ({ page }) => {
    await page.goto('/health');
    
    // ใช้ Regex เผื่อมีคำอื่นคั่นกลาง
    await expect(page.locator('h1', { hasText: /บทความ.*สุขภาพ/ })).toBeVisible();
    
    await expect(page.getByText('ความดันโลหิตสูง', { exact: false }).first()).toBeVisible();
    
    const firstArticleButton = page.locator('text="ดูข้อมูลเพิ่มเติม"').first();
    await firstArticleButton.click();
  });
});