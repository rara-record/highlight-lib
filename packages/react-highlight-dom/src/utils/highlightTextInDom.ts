import { findRangesInNode } from './findRangesInNode';
import { createRegexKeywords } from './createRegexKeywords';

interface HighlightTextParams {
  root: Node;
  keywords: string | string[];
  highlightName: string;
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
}

/**
 * 주어진 DOM 트리 내에서 모든 특정 키워드를 찾아 CSS Highlight API를 이용해 강조합니다.
 *
 * 이 함수는 텍스트 노드를 순회하며 `keywords`와 일치하는 모든 영역을 탐색하고,
 * 해당 영역을 `StaticRange`로 생성한 후 CSS Highlight에 등록합니다.
 * 만약 키워드가 비어 있거나 CSS Highlight API를 사용할 수 없는 환경에서는
 * 기존 하이라이트를 제거하고 빈 배열을 반환합니다.
 *
 * @param root - 하이라이트를 적용할 루트 DOM 노드
 * @param keywords - 강조할 키워드 문자열 또는 문자열 배열
 * @param highlightName - CSS Highlight 이름 (`::highlight(<name>)`으로 스타일링 가능)
 * @param highlightCaseSensitive - (선택) 대소문자 구분 여부 (기본값: false)
 * @param highlightEscape - (선택) 특수 문자 이스케이프 여부 (기본값: false)
 * @returns 생성된 StaticRange 객체들의 배열
 */

export function highlightTextInDom({
  root,
  keywords,
  highlightName,
  highlightCaseSensitive = false,
  highlightEscape = false,
}: HighlightTextParams): StaticRange[] {
  if (!window.CSS?.highlights) return [];

  const normalizedKeywords = Array.isArray(keywords) ? keywords : [keywords];

  if (normalizedKeywords.length === 0) {
    CSS.highlights.delete(highlightName);
    return [];
  }

  const processedNodes = new WeakSet<Node>();
  const highlight = new Highlight();
  const ranges: StaticRange[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  const patterns = highlightEscape
    ? createRegexKeywords(normalizedKeywords, highlightCaseSensitive, true)
    : normalizedKeywords;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    let nodeRanges: StaticRange[] = [];

    nodeRanges = findRangesInNode(node, patterns, highlightCaseSensitive);

    for (const range of nodeRanges) {
      highlight.add(range);
    }

    ranges.push(...nodeRanges);
    processedNodes.add(node);
  }

  CSS.highlights.set(highlightName, highlight);
  return ranges;
}
