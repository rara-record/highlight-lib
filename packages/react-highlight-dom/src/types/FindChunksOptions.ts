/**
 * 텍스트 청크를 찾기 위한 옵션 인터페이스
 */
export interface FindChunksOptions {
  /** 검색할 패턴 배열 (문자열 또는 정규식) */
  patterns: Array<string | RegExp>;
  /** 검색 대상 텍스트 */
  textContent: string;
}

/**
 * 텍스트 내에서 찾은 청크의 위치 정보
 */
export interface TextChunk {
  /** 청크의 시작 위치 (인덱스) */
  start: number;
  /** 청크의 끝 위치 (인덱스) */
  end: number;
}

/**
 * 사용자 정의 텍스트 청크 함수
 *
 * 텍스트 내에서 하이라이트할 범위를 직접 지정할 수 있습니다.
 * 기본 검색 로직을 대체하여 사용됩니다.
 *
 * @example
 * 마지막 3글자를 하이라이트하는 예제
 * const findLastThreeChars: FindChunksFunction = ({ textContent }) => {
 *   if (textContent.length < 3) return [];
 *   return [{
 *     start: textContent.length - 3,
 *     end: textContent.length
 *   }];
 * };
 */
export type FindChunksFunction = (options: FindChunksOptions) => TextChunk[];
