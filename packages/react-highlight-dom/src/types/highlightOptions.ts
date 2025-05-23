import { FindChunksFunction } from './FindChunksOptions';
import { HighlightSupportedStyle } from './HighlightSupportedStyle';

interface BaseHighlightOptions {
  highlightClassName?: string;
  highlightStyle?: HighlightSupportedStyle;
  onHighlight?: (ranges: StaticRange[]) => void;
  children: (ref: React.RefObject<any>) => React.ReactNode;
}

export interface KeywordsHighlightOptions extends BaseHighlightOptions {
  keywords: string | string[];
  highlightCaseSensitive?: boolean;
  highlightEscape?: boolean;
  findChunks?: never;
}

export interface FindChunksHighlightOptions extends BaseHighlightOptions {
  findChunks: FindChunksFunction;
  keywords?: never;
  highlightCaseSensitive?: never;
  highlightEscape?: never;
}

export type HighlightOptions = KeywordsHighlightOptions | FindChunksHighlightOptions;
