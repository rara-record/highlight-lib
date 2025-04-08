import type { HighlightSupportedStyle } from '../types/HighlightSupportedStyle';
import styleToCss from 'style-object-to-css-string';

/**
 * @param name CSS Highlight 이름
 * @param style CSS Highlight 스타일
 * @description CSS Highlight 스타일을 등록합니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight
 */
export function registerHighlightStyle(name: string, style?: HighlightSupportedStyle) {
  const sheet = new CSSStyleSheet();

  let cssText = '';

  if (style) {
    const css = styleToCss(style);
    cssText = `::highlight(${name}) { ${css} }`;
  }

  if (cssText) {
    sheet.replaceSync(cssText);
    document.adoptedStyleSheets.push(sheet);
  }
}
