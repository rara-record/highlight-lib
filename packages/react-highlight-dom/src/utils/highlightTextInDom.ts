import { createRange } from './createRange';

import {
  KeywordsHighlightStrategy,
  CustomHighlightStrategy,
} from '../strategies/HighlightStrategy';
import { FindChunksFunction } from '../types/FindChunksOptions';

interface highlightTextInDomParams {
  root: Node;
  highlightClassName: string;
  keywords?: string | string[];
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
  findChunks?: FindChunksFunction;
}

/**
 * 주어진 DOM 트리 내에서 텍스트를 찾아 CSS Highlight API를 이용해 강조합니다.
 *
 * @param params 하이라이트 설정 파라미터
 * @returns 생성된 StaticRange 객체들의 배열
 */
export function highlightTextInDom(params: highlightTextInDomParams): StaticRange[] {
  if (!window.CSS?.highlights) return [];

  const { root, highlightClassName, keywords, findChunks } = params;

  const strategy = findChunks
    ? new CustomHighlightStrategy(findChunks)
    : new KeywordsHighlightStrategy(
        keywords || '',
        params.highlightCaseSensitive,
        params.highlightEscape
      );

  const highlight = new Highlight();
  const ranges: StaticRange[] = [];

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const chunks = strategy.findChunks(node);

    const nodeRanges = chunks.map((chunk) =>
      createRange(node, chunk.start, chunk.end - chunk.start)
    );

    for (const range of nodeRanges) {
      highlight.add(range);
    }
    ranges.push(...nodeRanges);
  }

  if (ranges.length > 0) {
    CSS.highlights.set(highlightClassName, highlight);
  } else {
    CSS.highlights.delete(highlightClassName);
  }

  return ranges;
}
