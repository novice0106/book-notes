import { useState } from "react";
export default function SearchForm({ value, onSearch }) {
  const [text, setText] = useState(value);
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)}></input>
      <button onClick={() => onSearch(text)}>検索</button>
    </>
  );
}
