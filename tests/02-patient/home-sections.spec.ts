import { test, expect } from '@playwright/test';

test.describe('Public - Home Page Sections', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('TC-PUB-HOM-01: แถบสายด่วนฉุกเฉินด้านบนแสดงข้อมูลครบ (24 ชม., เบอร์โทร, สิทธิ 30 บาท/ประกันสังคม)', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toContainText('ศูนย์อุบัติเหตุและฉุกเฉิน');
    await expect(body).toContainText('24 ชั่วโมง');
    await expect(body).toContainText('02-165-5555');
    await expect(body).toContainText(/30 บาท/);
    await expect(body).toContainText('ประกันสังคม');
  });

  test('TC-PUB-HOM-02: ลิงก์ "สิทธิพิเศษ" (Novaria Elite & VIP) พาไปหน้า /vip-privileges', async ({ page }) => {
    await page.getByRole('link', { name: 'สิทธิพิเศษ' }).first().click();
    await expect(page).toHaveURL(/\/vip-privileges\/?$/);
  });

  test('TC-PUB-HOM-03: ส่วน "บริการของเรา" มีการ์ดครบ 7 ศูนย์ และลิงก์ชี้ไปหน้าย่อยที่ถูกต้อง', async ({ page }) => {
    const servicePaths = ['heart', 'cancer', 'bone', 'brain', 'emergency', 'checkup', 'surgery'];

    for (const slug of servicePaths) {
      const card = page.locator(`a[href$="/services/${slug}"]`).first();
      await expect(card, `ต้องมีการ์ดบริการ /services/${slug}`).toBeVisible();
    }
  });

  test('TC-PUB-HOM-04: คลิกการ์ด "ศูนย์หัวใจ" จากหน้าแรก แล้วเข้าหน้า /services/heart', async ({ page }) => {
    await page.locator('a[href$="/services/heart"]').first().click();
    await expect(page).toHaveURL(/\/services\/heart\/?$/);
  });

  test('TC-PUB-HOM-05: ปุ่ม "ดูบริการทั้งหมด" พาไปหน้า /services', async ({ page }) => {
    await page.getByRole('link', { name: 'ดูบริการทั้งหมด' }).first().click();
    await expect(page).toHaveURL(/\/services\/?$/);
  });

  test('TC-PUB-HOM-06: ปุ่ม "ดูแพ็กเกจทั้งหมด" พาไปหน้า /packages', async ({ page }) => {
    await page.getByRole('link', { name: 'ดูแพ็กเกจทั้งหมด' }).first().click();
    await expect(page).toHaveURL(/\/packages\/?$/);
  });

  test('TC-PUB-HOM-07: ลิงก์ "ติดต่อเรา" และ "ค้นหาแพทย์" บนหน้าแรกพาไปหน้าที่ถูกต้อง', async ({ page }) => {
    await page.getByRole('link', { name: 'ติดต่อเรา' }).first().click();
    await expect(page).toHaveURL(/\/contact\/?$/);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'ค้นหาแพทย์' }).first().click();
    await expect(page).toHaveURL(/\/doctors\/?$/);
  });

});

test.describe('Public - Footer Details', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('footer').scrollIntoViewIfNeeded();
  });

  test('TC-PUB-FTR-03: ตรารับรองมาตรฐานครบทั้ง 3 ตรา (JCI, CAMTS, HA)', async ({ page }) => {
    // ส่วนตรารับรองอยู่นอกแท็ก <footer> จึงตรวจจาก body
    const body = page.locator('body');
    await expect(body).toContainText('รางวัลและการรับรองมาตรฐาน');
    await expect(body).toContainText('JCI');
    await expect(body).toContainText('GOLD SEAL OF APPROVAL');
    await expect(body).toContainText(/camts/i);
    await expect(body).toContainText('GLOBAL HA ACCREDITED');
  });

  test('TC-PUB-FTR-04: ข้อมูลติดต่อใน Footer (ที่อยู่ เบอร์โทร อีเมล)', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('225 นครปฐม กำแพงแสน');
    await expect(footer).toContainText('02-165-5555');
    await expect(footer).toContainText('novaria@gmail.com');
  });

  test('TC-PUB-FTR-05: ลิงก์โซเชียลมีเดียครบ 5 ช่องทาง ชี้ไปโดเมนที่ถูกต้อง', async ({ page }) => {
    // ลิงก์โซเชียลอยู่นอกแท็ก <footer> จึงค้นหาทั้งหน้า
    const socials = ['facebook.com', 'line.me', 'tiktok.com', 'youtube.com', 'instagram.com'];

    for (const domain of socials) {
      const link = page.locator(`a[href*="${domain}"]`).first();
      await link.scrollIntoViewIfNeeded();
      await expect(link, `ต้องมีลิงก์ ${domain}`).toBeVisible();
      await expect(link).toHaveAttribute('href', new RegExp(`^https?://(www\\.)?${domain.replace('.', '\\.')}`));
    }
  });

  test('TC-PUB-FTR-06: ปุ่ม "รับข่าวสาร" พาไป /news และ "ข้อเสนอแนะ" พาไป /contact', async ({ page }) => {
    // ในเว็บจริงสองรายการนี้เป็นลิงก์ (<a>) ไม่ใช่ <button>
    // ปุ่มเหล่านี้อยู่นอกแท็ก <footer> จึงค้นหาทั้งหน้า
    await expect(page.getByRole('link', { name: 'รับข่าวสาร', exact: true }).first()).toHaveAttribute('href', /\/news$/);
    await expect(page.getByRole('link', { name: 'ข้อเสนอแนะ', exact: true }).first()).toHaveAttribute('href', /\/contact$/);
  });

  // ลิงก์ในคอลัมน์ Footer ทั้งหมด: คลิกแล้วต้องไปหน้าที่ถูกต้อง
  const footerLinks = [
    { name: 'ศูนย์และคลินิกเฉพาะทาง',        path: '/services' },
    { name: 'ค้นหาแพทย์',                     path: '/doctors' },
    { name: 'ทำนัดหมายออนไลน์',               path: '/booking' },
    { name: 'แพ็กเกจและโปรโมชั่น',            path: '/packages' },
    { name: 'ห้องพักผู้ป่วย',                 path: '/rooms' },
    { name: 'แผนที่และการเดินทาง',            path: '/branches' },
    { name: 'ประกัน และสิทธิการรักษา',        path: '/insurance' },
    { name: 'บทความทางการแพทย์',              path: '/health' },
    { name: 'แบบประเมินสุขภาพใจ',             path: '/mental-health' },
    { name: 'ประวัติโรงพยาบาล',               path: '/about' },
    { name: 'ข่าวสารและกิจกรรม',              path: '/news' },
    { name: 'ติดต่อสอบถาม',                   path: '/contact' },
    { name: 'นโยบายความเป็นส่วนตัว',          path: '/privacy' },
    { name: 'นโยบายคุกกี้ (Cookie Policy)',   path: '/cookies' },
  ];

  for (const [index, item] of footerLinks.entries()) {
    const id = `TC-PUB-FTR-${String(index + 7).padStart(2, '0')}`;

    test(`${id}: Footer link "${item.name}" พาไปหน้า ${item.path}`, async ({ page }) => {
      const link = page.locator('footer').getByRole('link', { name: item.name, exact: true }).first();
      await expect(link).toBeVisible();
      await link.click();

      // /booking อาจ redirect ไป /login ถ้าระบบบังคับล็อกอิน
      const expected = item.path === '/booking' ? /\/(booking|login)/ : new RegExp(`${item.path}/?$`);
      // เว็บจริงตอบช้าเป็นช่วงๆ (บางหน้า > 5 วินาที) จึงเพิ่ม timeout ของการรอ URL
      await expect(page).toHaveURL(expected, { timeout: 15000 });
    });
  }

});