import { useRef, useEffect } from 'react';
import type { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';
import { registerHighlightStyle } from '../utils/registerHighlightStyle';

export function useHighlightStyle<T extends HTMLElement>(
  highlightClassName?: string,
  highlightStyle?: HighlightSupportedStyle
): {
  ref: React.RefObject<T>;
  defaultClassName: string;
} {
  const ref = useRef<T>(null);
  const defaultClassName = highlightClassName ?? 'react-highlight-dom';

  useEffect(() => {
    registerHighlightStyle(defaultClassName, highlightStyle);
  }, [defaultClassName, highlightStyle]);

  return { ref, defaultClassName };
}
