import { typeStyle } from './utils.ts';
import assert from 'node:assert';

try {
  console.log('Running tests...');
  assert.deepStrictEqual(typeStyle('VARIANT'), { bg: '#F3EEFF', fg: '#7C3AED', label: 'Variant' });
  assert.deepStrictEqual(typeStyle('BOOLEAN'), { bg: '#F0FDF9', fg: '#0D9488', label: 'Boolean' });
  assert.deepStrictEqual(typeStyle('TEXT'), { bg: '#FFFBEB', fg: '#B45309', label: 'Text' });
  assert.deepStrictEqual(typeStyle('UNKNOWN'), { bg: '#EFF6FF', fg: '#2563EB', label: 'Instance' });
  assert.deepStrictEqual(typeStyle('INSTANCE_SWAP'), { bg: '#EFF6FF', fg: '#2563EB', label: 'Instance' });
  console.log('✅ All tests passed!');
} catch (e) {
  console.error('❌ Test failed!');
  console.error(e);
  process.exit(1);
}
