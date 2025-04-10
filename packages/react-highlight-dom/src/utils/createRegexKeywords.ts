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

/**
 * 정규식 메타 문자를 이스케이프 처리합니다.
 */
export function escapeRegex(keyword: string): string {
  return keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 키워드 배열을 정리하고 정규식 배열을 생성합니다.
 * @returns 정규식 배열
 */
export function createRegexKeywords(
  keywords: string | string[],
  highlightCaseSensitive = false,
  highlightEscape = false
): RegExp[] {
  const normalizedKeywords = normalizeKeywords(keywords);
  const flags = highlightCaseSensitive ? 'g' : 'gi';

  return normalizedKeywords.map((keyword) => {
    const processedKeyword = highlightEscape ? escapeRegex(keyword) : keyword;
    return new RegExp(processedKeyword, flags);
  });
}
