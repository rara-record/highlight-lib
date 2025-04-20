/**
 * StaticRange 객체를 생성하는 헬퍼 함수
 * @param node - 텍스트 노드
 * @param start - 시작 위치
 * @param length - 길이
 */
export function createRange(node: Text, start: number, length: number): StaticRange {
  return new StaticRange({
    startContainer: node,
    startOffset: start,
    endContainer: node,
    endOffset: start + length,
  });
}
