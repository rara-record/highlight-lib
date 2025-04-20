/**
 * 문자열 배열 또는 단일 문자열을 정리하여 반환합니다.
 * - 공백 제거
 * - 빈 문자열 필터링
 */
export function normalizeKeywords(keywords: string | string[]): string[] {
  const normalizedKeywords = Array.isArray(keywords) ? keywords : [keywords];
  return normalizedKeywords
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);
}

/** 정규식 특수 문자를 이스케이프하는 헬퍼 함수 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 키워드 배열을 RegExp 객체 배열로 변환합니다.
 * 정규식 특수 문자를 이스케이프할지, 대소문자를 구분할지 옵션을 통해 제어할 수 있습니다.
 *
 * @param normalizedKeywords - RegExp로 변환할 키워드 문자열 배열
 * @param highlightCaseSensitive - 대소문자 구분 여부 (true면 구분, false면 무시)
 * @param highlightEscape - 정규식 특수 문자를 이스케이프할지 여부 (true면 리터럴 검색, false면 정규식 패턴으로 사용)
 * @returns 생성된 RegExp 객체 배열
 */
export function createRegexKeywords(
  normalizedKeywords: string[],
  highlightCaseSensitive: boolean,
  highlightEscape: boolean
): RegExp[] {
  // 대소문자 구분 플래그 설정
  const flags = highlightCaseSensitive ? 'g' : 'gi';

  return normalizedKeywords
    .map((keyword) => {
      const pattern = highlightEscape ? escapeRegExp(keyword) : keyword;

      try {
        return new RegExp(pattern, flags);
      } catch (error) {
        console.error(
          `Invalid RegExp pattern created: "${pattern}" with flags "${flags}". Keyword: "${keyword}"`,
          error
        );

        return null;
      }
    })

    .filter((regex): regex is RegExp => regex !== null);
}
