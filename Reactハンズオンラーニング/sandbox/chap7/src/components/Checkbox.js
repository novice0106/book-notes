import { useEffect, useReducer } from "react";

export default function Checkbox() {
  const [checked, toggle] = useReducer((checked) => !checked, false);
  useEffect(() => {
    alert(`checked: ${checked.toString()}`);
  });

  return (
    <>
      <input type="checkbox" value={checked} onChange={toggle}></input>
      {checked ? "checked" : "not checked"}
    </>
  );
}
