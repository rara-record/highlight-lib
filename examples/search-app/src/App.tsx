import './App.css';
import { useState } from 'react';
import { Highlighter, type FindChunksOptions } from 'react-highlight-dom';
import ExampleComponent from './ExampleComponent';
import ExampleComponent2 from './ExampleComponent2';
import ExampleComponent3 from './ExampleComponent3';

// 마지막 3글자를 하이라이트하는 예제 함수
const findLastThreeChars = ({ textContent }: FindChunksOptions) => {
  if (textContent.length < 3) return [];
  return [
    {
      start: textContent.length - 3,
      end: textContent.length,
    },
  ];
};

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <h2>🔍 하이라이트 예제</h2>

      {/* 예제 1: 입력된 키워드 하이라이트 */}
      <h3>1. 입력된 키워드 하이라이트</h3>
      <p>사용자가 입력한 텍스트와 일치하는 부분을 주황색으로 하이라이트합니다.</p>
      <input
        className="search-input"
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Highlighter
        keywords={keyword} // 키워드 배열
        highlightClassName="search-highlight"
        highlightEscape={true}
        highlightCaseSensitive={false}
        onHighlight={(ranges) => console.log('하이라이트 범위:', ranges)}
      >
        {(ref) => <ExampleComponent ref={ref} />}
      </Highlighter>

      {/* 예제 2: 마지막 3글자 하이라이트 */}
      <h3>2. 사용자 정의 함수 하이라이트</h3>
      <p>텍스트의 마지막 세 글자를 분홍색으로 하이라이트합니다. (findChunks 함수 사용)</p>
      <Highlighter
        highlightClassName="search-highlight2"
        findChunks={findLastThreeChars} // 마지막 3글자 하이라이트
        onHighlight={(ranges) => console.log('하이라이트 범위:', ranges)}
      >
        {(ref) => <ExampleComponent2 ref={ref} keyword={keyword} />}
      </Highlighter>

      {/* 예제 3: 정규식 및 특수문자 포함 키워드 하이라이트 */}
      <h3>3. 정규식 및 특수문자 포함 키워드 하이라이트</h3>
      <p>정규식을 포함하여 일치하는 부분을 노란색으로 하이라이트합니다.</p>
      <Highlighter
        keywords={[
          '50\\%', // 정확히 "50%" 매칭
          'important', // "important" 매칭
          'file_v1[\\w\\.]\\w*', // file_v1 뒤에 오는 모든 문자와 숫자 매칭
          'React\\w*', // "React", "Reactjs" 등 매칭
          '\\[VIP\\]', // 정확히 "[VIP]" 매칭
        ]}
        highlightClassName="search-highlight3"
        highlightEscape={false}
        highlightCaseSensitive={false}
        onHighlight={(ranges) => console.log('하이라이트 범위:', ranges)}
      >
        {(ref) => <ExampleComponent3 ref={ref} />}
      </Highlighter>

      {/* 하이라이트 스타일 정의 */}
      <style>
        {`
          ::highlight(search-highlight) {
            background-color: orange;
            color: white;
          }
        `}
        {`
          ::highlight(search-highlight2) {
            background-color: pink;
            color: white;
          }
        `}
        {`
          ::highlight(search-highlight3) {
            background-color: yellow;
            color: black;
          }
        `}
      </style>
    </div>
  );
}

export default App;
