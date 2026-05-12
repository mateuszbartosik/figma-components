import { test } from 'node:test';
import assert from 'node:assert';
import { readingTime } from './utils.ts';

test('readingTime should return "—" for 0 words', () => {
  assert.strictEqual(readingTime(0), '—');
});

test('readingTime should return "0:00" for 1 word', () => {
  assert.strictEqual(readingTime(1), '0:00');
});

test('readingTime should return "0:30" for 100 words', () => {
  assert.strictEqual(readingTime(100), '0:30');
});

test('readingTime should return "1:00" for 200 words', () => {
  assert.strictEqual(readingTime(200), '1:00');
});

test('readingTime should return "1:30" for 300 words', () => {
  assert.strictEqual(readingTime(300), '1:30');
});

test('readingTime should return "10:00" for 2000 words', () => {
  assert.strictEqual(readingTime(2000), '10:00');
});

test('readingTime should handle rounding correctly (99 words)', () => {
  // 99 / 200 * 60 = 29.7 -> 30
  assert.strictEqual(readingTime(99), '0:30');
});

test('readingTime should handle rounding correctly (101 words)', () => {
  // 101 / 200 * 60 = 30.3 -> 30
  assert.strictEqual(readingTime(101), '0:30');
});

test('readingTime should handle rounding correctly (1 word)', () => {
  // 1 / 200 * 60 = 0.3 -> 0
  assert.strictEqual(readingTime(1), '0:00');
});

test('readingTime should handle rounding correctly (2 words)', () => {
  // 2 / 200 * 60 = 0.6 -> 1
  assert.strictEqual(readingTime(2), '0:01');
});
