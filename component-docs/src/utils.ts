export function typeStyle(type: string) {
  switch (type) {
    case 'VARIANT':  return { bg: '#F3EEFF', fg: '#7C3AED', label: 'Variant' };
    case 'BOOLEAN':  return { bg: '#F0FDF9', fg: '#0D9488', label: 'Boolean' };
    case 'TEXT':     return { bg: '#FFFBEB', fg: '#B45309', label: 'Text' };
    default:         return { bg: '#EFF6FF', fg: '#2563EB', label: 'Instance' };
  }
}
