import { type Stats, readingTime, computeStats } from './utils.ts';

figma.showUI(__html__, { width: 380, height: 520, title: 'Word Counter' });

// ─── Types ────────────────────────────────────────────────────────────────────

interface LayerInfo {
  id: string;
  name: string;
  preview: string;
  words: number;
  chars: number;
}

interface ScanResult {
  stats: Stats;
  layers: LayerInfo[];
  layerCount: number;
  isEmpty: boolean;
}

type Scope = 'selection' | 'page';

// ─── Text collection ──────────────────────────────────────────────────────────

function collectTextNodes(node: SceneNode): TextNode[] {
  if (node.type === 'TEXT') return [node];
  if ('children' in node) {
    return [...(node as ChildrenMixin).children].flatMap(c => collectTextNodes(c as SceneNode));
  }
  return [];
}

// ─── Scan ─────────────────────────────────────────────────────────────────────

function doScan(scope: Scope): ScanResult {
  const textNodes: TextNode[] = scope === 'selection'
    ? figma.currentPage.selection.flatMap(n => collectTextNodes(n as SceneNode))
    : (figma.currentPage.findAllWithCriteria({ types: ['TEXT'] }) as TextNode[]);

  if (textNodes.length === 0) {
    return {
      stats: { words: 0, chars: 0, charsNoSpaces: 0, paragraphs: 0, readingTime: '—' },
      layers: [],
      layerCount: 0,
      isEmpty: true,
    };
  }

  const allCharacters: string[] = new Array(textNodes.length);
  const layers: LayerInfo[] = textNodes.map((n, i) => {
    const text  = n.characters;
    allCharacters[i] = text;

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const raw   = text.replace(/\n/g, ' ').trim();
    return {
      id:      n.id,
      name:    n.name || 'Text',
      preview: raw.length > 44 ? raw.slice(0, 44) + '…' : raw,
      words,
      chars:   text.length,
    };
  });

  const combined = allCharacters.join('\n\n');
  const stats    = computeStats(combined);

  return { stats, layers, layerCount: textNodes.length, isEmpty: false };
}

// ─── Messaging ────────────────────────────────────────────────────────────────

let currentScope: Scope = 'selection';

function push(scope: Scope) {
  figma.ui.postMessage({ type: 'stats', result: doScan(scope), scope });
}

figma.ui.onmessage = async (msg: { type: string; scope?: Scope; nodeId?: string }) => {
  if (msg.type === 'init')     push(currentScope);
  if (msg.type === 'setScope') { currentScope = msg.scope!; push(currentScope); }
  if (msg.type === 'close')    figma.closePlugin();

  if (msg.type === 'selectLayer' && msg.nodeId) {
    const node = await figma.getNodeByIdAsync(msg.nodeId);
    if (node && node.type !== 'DOCUMENT' && node.type !== 'PAGE') {
      figma.currentPage.selection = [node as SceneNode];
      figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
    }
  }
};

figma.on('selectionchange', () => push(currentScope));
