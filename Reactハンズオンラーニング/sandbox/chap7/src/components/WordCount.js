import { useMemo, useEffect } from "react";

export default function WordCount({ children = "" }) {
  const words = useMemo(() => {
    const words = children.split(" ");
    return words;
  }, [children]);

  useEffect(() => {
    console.log("refresh words");
  }, [words]);

  return (
    <>
      <p>{children}</p>
      <p>{words.length} - words</p>
    </>
  );
}
