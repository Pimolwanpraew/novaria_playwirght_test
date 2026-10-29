import { test, expect } from '@playwright/test';

test.describe('ทดสอบหน้าข้อมูลโรงพยาบาล', () => {
  test('TC-ABT-01: ผู้ใช้สามารถดูข้อมูลประวัติ วิสัยทัศน์ และทีมผู้บริหารได้', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1', { hasText: /ข้อมูล.*โรงพยาบาล/ })).toBeVisible();
    
    // ตรวจสอบเมนูด้านข้างโดยระบุว่าเป็นลิงก์ (role="link") หรือใช้ .first()
    await expect(page.getByRole('link', { name: 'ข้อมูลโรงพยาบาล' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'วิสัยทัศน์และพันธกิจ' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ทีมผู้บริหาร' })).toBeVisible();
    
    await page.getByRole('link', { name: 'วิสัยทัศน์และพันธกิจ' }).click();
  });
});