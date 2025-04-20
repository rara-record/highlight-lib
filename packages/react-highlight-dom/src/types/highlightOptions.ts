import { FindChunksFunction } from './FindChunksOptions';
import { HighlightSupportedStyle } from './HighlightSupportedStyle';

interface BaseHighlightOptions {
  highlightClassName?: string;
  highlightStyle?: HighlightSupportedStyle;
  onHighlight?: (ranges: StaticRange[]) => void;
}

export interface KeywordsHighlightOptions extends BaseHighlightOptions {
  type: 'keywords';
  keywords: string | string[];
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
  findChunks?: never;
}

export interface FindChunksHighlightOptions extends BaseHighlightOptions {
  type: 'custom';
  findChunks: FindChunksFunction;
  keywords?: never;
  highlightCaseSensitive?: never;
  highlightEscape?: never;
}

export type HighlightOptions = KeywordsHighlightOptions | FindChunksHighlightOptions;
