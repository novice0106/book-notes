import StarRating from "./components/star_rating";
import "./App.css";

function App() {
  return (
    <StarRating
      style={{ backgroundColor: "lightblue" }}
      onDoubleClick={(e) => alert("double click")}
    />
  );
}

export default App;
