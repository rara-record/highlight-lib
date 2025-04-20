import { useEffect } from 'react';
import { useHighlightStyle } from './useHighlightStyle';
import { highlightTextInDom } from '../utils/highlightTextInDom';
import { FindChunksFunction } from '../types/FindChunksOptions';
import { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';

interface UseHighlightProps {
  keywords?: string | string[];
  highlightClassName?: string;
  highlightStyle?: HighlightSupportedStyle;
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
  findChunks?: FindChunksFunction;
  onHighlight?: (ranges: StaticRange[]) => void;
}

/**
 * `useHighlight` 훅은 DOM 요소 내 텍스트를 CSS Highlight API를 사용해 강조합니다.
 *
 * 두 가지 모드로 동작합니다:
 * 1. keywords 모드: 주어진 키워드와 일치하는 모든 텍스트 영역을 찾아 강조
 * 2. findChunks 모드: 사용자 정의 findChunks 함수를 사용하여 강조할 영역을 결정
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
 * @param onHighlight - (선택) 적용된 StaticRange 목록을 전달하는 콜백
 * @param findChunks - (선택) 사용자 정의 청크 찾기 함수
 * @param highlightClassName - (선택) 하이라이트 이름 (CSS의 `::highlight()` selector에 사용됨)
 * @param highlightStyle - (선택) 직접 적용할 스타일 객체 (JS에서 지정)
 * @returns React ref - 강조할 DOM 요소에 연결해야 할 ref 객체
 *
 * @example
 * const ref = useHighlight('React', {
 *   highlightClassName: 'my-highlight',
 *   highlightCaseSensitive: true,
 *   highlightEscape: false,
 *   onHighlight: (ranges) => console.log('하이라이트된 범위:', ranges),
 * });
 *
 * return <div ref={ref}>React가 좋아요.</div>;
 */
export function useHighlight<T extends HTMLElement>(
  options: UseHighlightProps
): React.RefObject<T> {
  const { ref, defaultClassName } = useHighlightStyle<T>(
    options?.highlightClassName,
    options?.highlightStyle
  );

  useEffect(() => {
    if (!ref.current) return;

    const ranges = highlightTextInDom({
      root: ref.current,
      ...options,
      highlightClassName: defaultClassName,
    });

    options?.onHighlight?.(ranges);
  }, [options, ref.current]);

  return ref;
}
