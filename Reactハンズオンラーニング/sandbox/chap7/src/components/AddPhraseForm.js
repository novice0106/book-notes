import { useState, useEffect } from "react";

export default function AddPhraseForm() {
  const [val, setVal] = useState("");
  const [phrase, setPhrase] = useState("");

  const createPhrase = () => {
    setPhrase(val);
    setVal("");
  };

  useEffect(() => {
    console.log(`typing: "${val}"`);
  }, [val]);

  useEffect(() => {
    console.log(`saved phrase: "${phrase}"`);
  }, [phrase]);

  return (
    <>
      <input
        value={val}
        placeholder={phrase}
        onChange={(e) => setVal(e.target.value)}
      ></input>
      <button onClick={createPhrase}>send</button>
      <div>val: {JSON.stringify(val)}</div>
    </>
  );
}
