import type { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';
import styleToCss from 'style-object-to-css-string';

const registeredHighlightNames = new Set<string>();

/**
 * 지정된 highlight 이름(name)과 스타일(style)을 기반으로
 * CSS Highlight 스타일을 브라우저에 등록합니다.
 *
 * @param name - ::highlight()에 사용될 하이라이트 클래스 이름
 * @param style - 적용할 스타일 객체 (HighlightSupportedStyle)
 */
export function registerHighlightStyle(name: string, style?: HighlightSupportedStyle) {
  if (typeof document === 'undefined' || !style || registeredHighlightNames.has(name)) return;

  const css = styleToCss(style);
  const cssText = `::highlight(${name}) { ${css} }`;

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  document.adoptedStyleSheets.push(sheet);

  registeredHighlightNames.add(name);
}
