interface HighlightTextParams {
  root: Node;
  keyword: string;
  highlightName: string;
}

/**
 * 주어진 DOM 트리 내에서 특정 키워드를 찾아 CSS Highlight API를 이용해 강조합니다.
 *
 * 이 함수는 텍스트 노드를 순회하며 `keyword`와 일치하는 모든 영역을 탐색하고,
 * 해당 영역을 `StaticRange`로 생성한 후 CSS Highlight에 등록합니다.
 *
 * 검색은 대소문자를 구분하지 않으며, 일치하는 모든 노드를 강조합니다.
 * 만약 키워드가 비어 있거나 CSS Highlight API를 사용할 수 없는 환경에서는
 * 기존 하이라이트를 제거하고 빈 배열을 반환합니다.
 *
 * @param root - 하이라이트를 적용할 루트 DOM 노드
 * @param keyword - 강조할 키워드 문자열
 * @param highlightName - CSS Highlight 이름 (`::highlight(<name>)`으로 스타일링 가능)
 * @returns 생성된 StaticRange 객체들의 배열
 */

export function highlightTextInDom({
  root,
  keyword,
  highlightName,
}: HighlightTextParams): StaticRange[] {
  if (!window.CSS?.highlights) return [];

  const lowerKeyword = keyword.trim().toLowerCase();

  if (!lowerKeyword) {
    CSS.highlights.delete(highlightName);
    return [];
  }

  const highlight = new Highlight();
  const ranges: StaticRange[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const text = node.nodeValue;
    if (!text) continue;

    const lowerText = text.toLowerCase();
    let index = 0;

    index = lowerText.indexOf(lowerKeyword, index);

    while (index !== -1) {
      const range = new StaticRange({
        startContainer: node,
        startOffset: index,
        endContainer: node,
        endOffset: index + lowerKeyword.length,
      });

      highlight.add(range);
      ranges.push(range);

      // 현재 찾은 키워드 다음 위치 부터 검색
      index += lowerKeyword.length;
      index = text.indexOf(lowerKeyword, index);
    }
  }

  CSS.highlights.set(highlightName, highlight);
  return ranges;
}
