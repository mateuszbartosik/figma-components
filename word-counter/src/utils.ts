export interface Stats {
  words: number;
  chars: number;
  charsNoSpaces: number;
  paragraphs: number;
  readingTime: string;
}

export function readingTime(words: number): string {
  if (words === 0) return '—';
  const totalSec = Math.round((words / 200) * 60);
  const mm = Math.floor(totalSec / 60);
  const ss = totalSec % 60;
  return `${mm}:${String(ss).padStart(2, '0')}`;
}

export function computeStats(text: string): Stats {
  const trimmed = text.trim();

  if (!trimmed) {
    return { words: 0, chars: 0, charsNoSpaces: 0, paragraphs: 0, readingTime: '—' };
  }

  const words         = trimmed.split(/\s+/).length;
  const chars         = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const paragraphs    = trimmed.split(/\n{2,}/).filter(p => p.trim().length > 0).length || 1;

  return { words, chars, charsNoSpaces, paragraphs, readingTime: readingTime(words) };
}
