import { findRangesInNode, createRange } from './findRangesInNode';
import { createRegexKeywords, normalizeKeywords } from './createRegexKeywords';

import type { FindChunksFunction } from '../types/FindChunksOptions';

interface HighlightTextParams {
  root: Node;
  keywords: string | string[];
  highlightName: string;
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
  findChunks?: FindChunksFunction;
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
 * @param findChunks - (선택) 사용자 정의 청크 함수
 * @returns 생성된 StaticRange 객체들의 배열
 */

export function highlightTextInDom({
  root,
  keywords,
  highlightName,
  highlightCaseSensitive = false,
  highlightEscape = false,
  findChunks,
}: HighlightTextParams): StaticRange[] {
  // CSS Highlight API 지원 확인
  if (!window.CSS?.highlights) return [];

  // 키워드 정규화 및 유효성 검사
  const normalizedKeywords = normalizeKeywords(keywords);
  const hasValidKeyword = normalizedKeywords.length > 0;
  if (!hasValidKeyword) {
    CSS.highlights.delete(highlightName);
    return [];
  }

  // 하이라이트 처리 준비
  const processedNodes = new WeakSet<Node>();
  const highlight = new Highlight();
  const ranges: StaticRange[] = [];

  // 텍스트 노드 순회를 위한 TreeWalker 생성
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  // 검색에 사용할 패턴 생성 (정규식 또는 문자열)
  const patterns = highlightEscape
    ? createRegexKeywords(normalizedKeywords, highlightCaseSensitive, true)
    : normalizedKeywords;

  // 텍스트 노드 순회하며 매칭 범위 찾기
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    let nodeRanges: StaticRange[] = [];

    // 사용자 정의 함수 실행
    if (findChunks) {
      const chunks = findChunks({
        patterns,
        textContent: node.textContent || '',
      });

      nodeRanges = chunks.map((chunk) => createRange(node, chunk.start, chunk.end - chunk.start));

      // 기본 로직 실행
    } else {
      nodeRanges = findRangesInNode(node, patterns, highlightCaseSensitive);
    }

    for (const range of nodeRanges) {
      highlight.add(range);
    }

    ranges.push(...nodeRanges);
    processedNodes.add(node);
  }

  // 최종 하이라이트 적용
  CSS.highlights.set(highlightName, highlight);
  return ranges;
}
