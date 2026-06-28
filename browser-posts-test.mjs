import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5180';
const SUPABASE_URL = 'https://clbjktgdpwdyzozigrej.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsYmprdGdkcHdkeXpvemlncmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzA5MjEsImV4cCI6MjA5ODE0NjkyMX0.tP_yR9LaPbPFhnJ-cgHKfSE_mJ3VoXD9wN3hGKTp800';

import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const testId = Date.now();
const testEmail = `unisphere.post.test.${testId}@mailinator.com`;
const testPassword = 'StrongPass123!';
const testUsername = `posttest${testId}`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') errors.push(text);
    if (text.includes('[post]')) console.log('[BROWSER]', text);
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    // Signup
    await page.goto(`${BASE_URL}/register`);
    await page.fill('#fullname', 'Post Test User');
    await page.fill('#username', testUsername);
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.fill('#confirm-password', testPassword);
    await page.waitForTimeout(1000);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/dashboard`, { timeout: 15000 });
    console.log('✅ Signup and redirect to dashboard');

    // Wait for dashboard to load
    await page.waitForSelector('.social-composer', { timeout: 10000 });

    // Handle onboarding modal if shown
    const skipOnboarding = page.locator('#onboarding-skip');
    if (await skipOnboarding.count() > 0 && await skipOnboarding.isVisible()) {
      await skipOnboarding.click();
      await page.waitForTimeout(500);
    }

    // Create a post
    await page.click('#composer-trigger');
    await page.waitForSelector('#composer-expanded:not(.hidden)', { timeout: 5000 });
    await page.fill('#composer-text', `Hello campus! This is a test post ${testId}`);
    await page.click('#composer-post');

    // Wait for dashboard reload
    await page.waitForTimeout(2000);

    // Check if post appears in feed
    const feedText = await page.textContent('#feed-list');
    if (feedText.includes(`Hello campus! This is a test post ${testId}`)) {
      console.log('✅ Post appears in feed');
    } else {
      console.log('❌ Post not found in feed');
      console.log('Feed content:', feedText.slice(0, 500));
    }

    // Like the post
    const likeBtn = page.locator('.post-action-btn', { hasText: 'Like' }).first();
    if (await likeBtn.count() > 0) {
      await likeBtn.click();
      await page.waitForTimeout(1500);
      const likedBtn = page.locator('.post-action-btn.active', { hasText: 'Liked' }).first();
      const hasLiked = await likedBtn.count() > 0;
      console.log(hasLiked ? '✅ Like works' : '❌ Like did not update');
      if (!hasLiked) {
        const bodyText = await page.textContent('body');
        console.log('Body has Liked text:', bodyText.includes('Liked'));
      }
    }

    // Open comments
    const commentBtn = page.locator('.post-action-btn', { hasText: 'Comment' }).first();
    if (await commentBtn.count() > 0) {
      await commentBtn.click();
      await page.waitForURL(/\/post\?id=/, { timeout: 10000 });
      console.log('✅ Navigated to post detail');

      console.log('Post detail URL:', page.url());
      await page.screenshot({ path: 'post-detail-debug.png', fullPage: true });
      console.log('Screenshot saved to post-detail-debug.png');
      await page.waitForSelector('#comment-text', { timeout: 10000 });
      await page.fill('#comment-text', 'Nice test post!');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1500);
      const commentsText = await page.textContent('.comments-list');
      console.log(commentsText.includes('Nice test post!') ? '✅ Comment posted' : '❌ Comment not found');
    }

  } catch (e) {
    console.error('Test error:', e);
  }

  if (errors.length > 0) {
    console.log('\nConsole errors:');
    errors.forEach(e => console.log('  -', e));
  }

  await browser.close();
})();
