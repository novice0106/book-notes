import { useState } from "react";

export default function AddColorForm({ onNewColor = (f) => f }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");

  const submit = (e) => {
    e.preventDefault();
    onNewColor(title, color);
    setTitle("");
    setColor("");
  };

  return (
    <form onSubmit={submit}>
      <input
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="color title..."
        required
      ></input>
      <input
        onChange={(event) => setColor(event.target.value)}
        type="color"
        required
      ></input>
      <button>ADD</button>
    </form>
  );
}
