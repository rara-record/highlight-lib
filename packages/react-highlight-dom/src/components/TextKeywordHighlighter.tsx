import { useTextKeywordHighlight } from '../hooks/useTextKeywordHighlight';
import type { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';

interface TextKeywordHighlighterProps {
  children: (ref: React.RefObject<any>) => React.ReactNode;
  keywords: string[] | string;
  highlightClassName?: string;
  highlightStyle?: HighlightSupportedStyle;
  caseSensitive?: boolean;
  onHighlight?: (ranges: StaticRange[]) => void;
}
/**
 * `<TextKeywordHighlighter />`는 주어진 키워드를 기준으로
 * 자식 DOM 요소 내 텍스트를 강조하는 React 컴포넌트입니다.
 *
 * 하이라이트 스타일은 다음 두 가지 방식으로 지정할 수 있습니다:
 *
 * 1. `highlightStyle`을 통해 직접 스타일 객체를 전달
 * 2. 또는 `highlightClassName`을 지정하고, CSS에서 `::highlight(<name>)` 규칙을 정의
 *    → 이 방식은 `highlightStyle`을 사용하지 않아도 되며, 사용자 정의 CSS를 자유롭게 적용할 수 있습니다.
 *
 * @example
 * ```css
 * ::highlight(my-highlight) {
 *   background-color: yellow;
 *   color: black;
 * }
 * ```
 *
 * @param keyword - 강조할 키워드
 * @param highlightClassName - (선택) 하이라이트 이름 (CSS의 `::highlight()` selector에 사용됨)
 * @param highlightStyle - (선택) 직접 적용할 스타일 객체 (JS에서 지정)
 * @param onHighlight - (선택) 적용된 StaticRange 목록을 전달하는 콜백
 * @param children - `ref`를 인자로 받는 render prop 함수 (DOM 요소 연결용)
 *
 * @example
 * <TextKeywordHighlighter
 *   keyword="예시"
 *   highlightClassName="my-highlight"
 *   highlightStyle={{ backgroundColor: 'yellow', color: 'black' }}
 *   onHighlight={(ranges) => console.log(ranges)}
 * >
 *   {(ref) => <div ref={ref}>이건 예시 텍스트입니다.</div>}
 * </TextKeywordHighlighter>
 *
 * @returns render prop을 통해 하이라이트 대상 DOM에 연결 가능한 `ref`를 주입합니다.
 */
export const TextKeywordHighlighter = ({
  children,
  keywords,
  highlightClassName,
  highlightStyle,
  caseSensitive,
  onHighlight,
}: TextKeywordHighlighterProps) => {
  const ref = useTextKeywordHighlight<HTMLElement>(keywords, {
    highlightClassName,
    highlightStyle,
    onHighlight,
  });

  return <>{children(ref)}</>;
};
