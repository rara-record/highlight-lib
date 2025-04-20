import type { FindChunksFunction, TextChunk } from '../types/FindChunksOptions';
import { createRegexKeywords } from '../utils/createRegexKeywords';

export interface HighlightStrategy {
  findChunks(node: Text): TextChunk[];
}

export class KeywordsHighlightStrategy implements HighlightStrategy {
  private patterns: RegExp[];

  constructor(
    keywords: string | string[],
    highlightCaseSensitive: boolean = false,
    highlightEscape: boolean = false
  ) {
    const normalizedKeywords = Array.isArray(keywords) ? keywords : [keywords];
    this.patterns = createRegexKeywords(
      normalizedKeywords,
      highlightCaseSensitive,
      highlightEscape
    );
  }

  findChunks(node: Text): TextChunk[] {
    const chunks: TextChunk[] = [];
    const text = node.textContent || '';

    for (const pattern of this.patterns) {
      pattern.lastIndex = 0;

      while (true) {
        const match = pattern.exec(text);

        if (match === null) break;

        // 정규식이 빈 문자열과 매치됐을 때 무한 루프를 방지하고, 빈 매치 결과는 건너뜁니다.
        if (match.index === pattern.lastIndex) {
          pattern.lastIndex++;
          continue;
        }

        const matchedText = match[0];
        const startPosition = match.index;
        const matchLength = matchedText.length;

        chunks.push({
          start: startPosition,
          end: startPosition + matchLength,
        });
      }
    }
    return chunks;
  }
}

export class CustomHighlightStrategy implements HighlightStrategy {
  constructor(private findChunksFunc: FindChunksFunction) {}

  findChunks(node: Text): TextChunk[] {
    return this.findChunksFunc({
      textContent: node.textContent || '',
    });
  }
}
