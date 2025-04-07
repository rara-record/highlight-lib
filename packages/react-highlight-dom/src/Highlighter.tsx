interface HighlighterProps {
  keyword: string;
}

export const Highlighter = ({ keyword }: HighlighterProps) => {
  return <div>안녕하세요 {keyword}</div>;
};
