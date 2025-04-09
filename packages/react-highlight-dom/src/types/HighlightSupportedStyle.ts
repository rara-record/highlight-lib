import type { CSSProperties } from 'react';

/**
 * A subset of CSS properties that are officially supported by the CSS `::highlight()` pseudo-element.
 *
 * This type ensures only compatible styles can be used for DOM highlight styling via the CSS Highlight API.
 *
 * Supported properties:
 * - `color`: Text color
 * - `backgroundColor`: Background color behind the text
 * - `textDecoration`: Combined text decoration shorthand
 * - `textDecorationColor`: Color of underline/line-through
 * - `textDecorationLine`: Type of line (underline, overline, etc.)
 * - `textDecorationStyle`: Line style (solid, dashed, etc.)
 * - `textDecorationThickness`: Thickness of the text decoration
 * - `textShadow`: Shadow applied to the text
 *
 * Note: Any unsupported properties passed to the CSS Highlight API will be ignored silently.
 * * @see https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight
 */
export type HighlightSupportedStyle = Pick<
  CSSProperties,
  | 'color'
  | 'backgroundColor'
  | 'textDecoration'
  | 'textDecorationColor'
  | 'textDecorationLine'
  | 'textDecorationStyle'
  | 'textDecorationThickness'
  | 'textShadow'
>;
