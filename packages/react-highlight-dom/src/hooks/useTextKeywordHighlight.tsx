import { useEffect } from 'react';
import { useHighlightStyle } from './useHighlightStyle';
import { highlightTextInDom } from '../utils/highlightTextInDom';
import type { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';

import type { FindChunksFunction, TextChunk } from '../types/FindChunksOptions';

interface TextKeywordHighlightOptions {
  highlightName?: string;
  highlightClassName?: string;
  highlightStyle?: HighlightSupportedStyle;
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
  findChunks?: FindChunksFunction;
  onHighlight?: (ranges: StaticRange[]) => void;
}

/**
 * `useTextKeywordHighlight` 훅은 특정 키워드를 기준으로
 * 지정된 DOM 요소 내 텍스트를 CSS Highlight API를 사용해 강조합니다.
 *
 * 하이라이트 스타일은 다음 두 가지 방식 중 택일할 수 있습니다:
 * 1. `highlightStyle`: JS 객체로 직접 스타일 지정
 * 2. `highlightClassName`: 하이라이트 이름을 지정하고 CSS에서 `::highlight(<name>)`로 스타일 정의
 *
 * @example
 * ```css
 * ::highlight(my-highlight) {
 *   background-color: yellow;
 *   color: black;
 * }
 * ```
 *
 * @param keywords - 강조할 키워드
 * @param options - 하이라이트 이름, 스타일, 하이라이트 완료 후 호출될 콜백 등
 * @param highlightCaseSensitive - (선택) 대소문자 구분 여부 (기본값: false)
 * @param highlightEscape - (선택) 특수 문자 이스케이프 여부 (기본값: false)
 * @returns React ref - 강조할 DOM 요소에 연결해야 할 ref 객체
 *
 * @example
 * const ref = useTextKeywordHighlight('React', {
 *   highlightClassName: 'my-highlight',
 *   highlightCaseSensitive: true,
 *   highlightEscape: false,
 *   onHighlight: (ranges) => console.log('하이라이트된 범위:', ranges),
 * });
 *
 * return <div ref={ref}>React가 좋아요.</div>;
 */
export function useTextKeywordHighlight<T extends HTMLElement>(
  keywords: string | string[],
  options?: TextKeywordHighlightOptions
): React.RefObject<T> {
  const { ref, highlightName } = useHighlightStyle<T>(
    options?.highlightClassName,
    options?.highlightStyle
  );

  useEffect(() => {
    if (!ref.current) return;

    const ranges = highlightTextInDom({
      root: ref.current,
      keywords,
      highlightName,
      highlightCaseSensitive: options?.highlightCaseSensitive,
      highlightEscape: options?.highlightEscape,
      findChunks: options?.findChunks,
    });

    options?.onHighlight?.(ranges);
  }, [keywords, highlightName, options, ref.current]);

  return ref;
}
