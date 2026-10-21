import { test, expect } from '@playwright/test';
import { price, tax } from './pricing.js';

test.describe('pricing', () => {
  test('computes a base price', () => {
    expect(price(2, 10)).toBe(20);
  });

  test('adds tax', () => {
    expect(tax(100)).toBe(120);
  });

  test('handles zero quantity', () => {
    expect(price(0, 10)).toBe(0);
  });
});

test.describe('pricing flaky', () => {
  test('flaky: computes price under load', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated timeout computing price');
    }
    expect(price(3, 10)).toBe(30);
  });

  test('flaky: fails on first attempt only', () => {
    if (process.env.GITHUB_RUN_ATTEMPT === '1') {
      throw new Error('flaky: simulated first-attempt failure (GITHUB_RUN_ATTEMPT=1)');
    }
    expect(price(3, 10)).toBe(30);
  });

  test('flaky: adds tax under contention', () => {
    if (Math.random() < 0.4) {
      throw new Error('flaky: simulated stale tax table');
    }
    expect(tax(50)).toBe(60);
  });
});
