import { useRef, useEffect } from 'react';
import type { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';
import styleToCss from 'style-object-to-css-string';
import { registerHighlightStyle } from '../utils/registerHighlightStyle';

export function useHighlightStyle<T extends HTMLElement>(
  highlightClassName?: string,
  highlightStyle?: HighlightSupportedStyle
): {
  ref: React.RefObject<T>;
  highlightName: string;
} {
  const ref = useRef<T>(null);
  const highlightName = highlightClassName ?? 'react-highlight-dom';

  useEffect(() => {
    registerHighlightStyle(highlightName, highlightStyle);
  }, [highlightName, highlightStyle]);

  return { ref, highlightName };
}
