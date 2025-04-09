import './App.css';
import { useState } from 'react';
import { TextKeywordHighlighter } from 'react-highlight-dom';
import ExampleComponent from './ExampleComponent';

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <h2>🔍 키워드 하이라이트 예제</h2>

      <input
        className="search-input"
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <TextKeywordHighlighter
        keywords={['maxime', 'dolor', 'quis']}
        highlightClassName="search-highlight"
        // highlightStyle={{ backgroundColor: 'orange', color: 'white' }}
        onHighlight={(ranges) => console.log('하이라이트 범위:', ranges)}
      >
        {(ref) => <ExampleComponent ref={ref} />}
      </TextKeywordHighlighter>

      <style>
        {`
          ::highlight(search-highlight) {
            background-color: orange;
            color: white;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
