/**
 * StaticRange 객체를 생성하는 헬퍼 함수
 */
function createRange(node: Text, start: number, length: number): StaticRange {
  return new StaticRange({
    startContainer: node,
    startOffset: start,
    endContainer: node,
    endOffset: start + length,
  });
}

/**
 * 정규식 패턴으로 텍스트 노드에서 매칭되는 범위를 찾습니다.
 */
function findRegexRanges(node: Text, pattern: RegExp): StaticRange[] {
  const ranges: StaticRange[] = [];
  const text = node.textContent || '';

  pattern.lastIndex = 0;

  let match: RegExpExecArray | null;

  while (true) {
    match = pattern.exec(text);
    if (match === null) break;

    ranges.push(createRange(node, match.index, match[0].length));

    // 정규식이 global 플래그가 없으면 무한 루프를 방지하기 위해 종료
    if (!pattern.global) {
      pattern.lastIndex = 0; // lastIndex 초기화
      break;
    }
  }

  return ranges;
}

/**
 * 일반 문자열 패턴으로 텍스트 노드에서 매칭되는 범위를 찾습니다.
 */
function findStringRanges(node: Text, pattern: string, caseSensitive: boolean): StaticRange[] {
  const ranges: StaticRange[] = [];
  const text = node.textContent || '';

  // 대소문자 구분이 필요없는 경우 모두 소문자로 변환
  const searchText = caseSensitive ? text : text.toLowerCase();
  const searchPattern = caseSensitive ? pattern : pattern.toLowerCase();

  let position = 0;
  while (true) {
    const foundPosition = searchText.indexOf(searchPattern, position);
    if (foundPosition === -1) break;

    ranges.push(createRange(node, foundPosition, pattern.length));
    position = foundPosition + pattern.length;
  }

  return ranges;
}

/**
 * 텍스트 노드 내에서 주어진 패턴과 일치하는 모든 범위를 찾습니다.
 *
 * @param node - 검색 대상 텍스트 노드
 * @param patterns - 검색할 패턴들 (정규식 또는 문자열)
 * @param caseSensitive - 대소문자 구분 여부
 * @returns 매칭된 모든 범위의 StaticRange 배열
 *
 * @example
 * 정규식으로 검색
 * findRangesInNode(textNode, [/\d+/g], true);
 *
 * 문자열로 검색
 * findRangesInNode(textNode, ['hello', 'world'], false);
 */
export function findRangesInNode(
  node: Text,
  patterns: Array<string | RegExp>,
  caseSensitive = false
): StaticRange[] {
  const ranges: StaticRange[] = [];

  for (const pattern of patterns) {
    if (pattern instanceof RegExp) {
      ranges.push(...findRegexRanges(node, pattern));
    } else {
      ranges.push(...findStringRanges(node, pattern, caseSensitive));
    }
  }

  return ranges;
}
