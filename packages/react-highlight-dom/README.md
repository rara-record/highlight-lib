# react-highlight

A React component for real-time text highlighting

> Highlight by keywords or using a custom findChunks function
> to mark any text range within your DOM.

---

## Features

- Automatic keyword detection and highlighting
- Custom range highlighting via findChunks
- Supports both CSS ::highlight() and inline styles
- Callback with highlighted StaticRange objects
- Type-safe, modern React design

---

## Installation

```bash
pnpm add react-highlight
# or
npm install react-highlight
# or
yarn add react-highlight
```

---

## Usage

### 1. Basic Keyword Highlight

```tsx
import { Highlighter } from "react-highlight";

<Highlighter
  keywords={["example", "highlight"]}
  highlightClassName="my-highlight"
  highlightStyle={{ backgroundColor: "yellow", color: "black" }}
  onHighlight={(ranges) => {
    console.log("Highlighted StaticRanges:", ranges);
  }}
>
  {(ref) => (
    <div ref={ref}>
      This is an example text.
      Try out the highlight feature!
    </div>
  )}
</Highlighter>
```

#### CSS

You can use the highlightStyle prop for inline styles, or define a highlight style using a custom class name:

```css
::highlight(my-highlight) {
  background-color: yellow;
  color: black;
}
```

---

### 2. Custom Chunk Highlight

```tsx
import { Highlighter } from "react-highlight";

const findCustomChunks = (text) => {
  // Highlight every 5 characters
  const chunks = [];
  for (let i = 0; i < text.length; i += 5) {
    chunks.push({ start: i, end: Math.min(i + 5, text.length) });
  }
  return chunks;
};

export default function App() {
  return (
    <Highlighter
      findChunks={findCustomChunks}
      highlightClassName="my-highlight"
    >
      {(ref) => (
        <div ref={ref}>
          You can define highlight ranges using a custom findChunks function.
        </div>
      )}
    </Highlighter>
  );
}
```

---

## Props

| Prop                      | Type                                                    | Description                                                                                   |
|---------------------------|---------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `keywords`                | `string \| string[]`                                    | Keywords to highlight (cannot be used together with `findChunks`)                             |
| `highlightClassName`      | `string`                                                | Name of the highlight style (used with CSS `::highlight()`)                                   |
| `highlightStyle`          | `React.CSSProperties`                                   | Inline style object for highlights                                                            |
| `highlightCaseSensitive`  | `boolean`                                               | Case sensitivity (default: `false`)                                                           |
| `highlightEscape`         | `boolean`                                               | Escape special characters (default: `false`)                                                  |
| `findChunks`              | `(text: string) => { start: number, end: number }[]`    | Custom function to define highlight ranges (cannot be used together with `keywords`)          |
| `onHighlight`             | `(ranges: StaticRange[]) => void`                       | Callback with highlighted `StaticRange` objects                                               |
| `children`                | `(ref: React.RefObject<any>) => React.ReactNode`        | Function to render the target DOM node (must attach the provided ref)                         |

## License

MIT
