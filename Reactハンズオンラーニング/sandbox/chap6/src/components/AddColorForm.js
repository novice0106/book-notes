import { useInput } from "../hooks/hooks";

export default function AddColorForm({ onNewColor = (f) => f }) {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");

  const submit = (e) => {
    e.preventDefault();
    onNewColor(titleProps.value, colorProps.value);
    resetTitle("");
    resetColor("#000000");
  };

  return (
    <form onSubmit={submit}>
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      ></input>
      <input {...colorProps} type="color" required></input>
      <button>ADD</button>
    </form>
  );
}
