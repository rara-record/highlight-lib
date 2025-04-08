interface HighlightTextParams {
  root: Node;
  keyword: string;
  highlightName: string;
}

/**
 * @param root 대상 노드
 * @param keyword 검색 키워드
 * @param highlightName CSS Highlight 이름
 * @returns 생성된 StaticRange 리스트
 */
export function highlightTextInDom({ root, keyword, highlightName }: HighlightTextParams): StaticRange[] {
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
