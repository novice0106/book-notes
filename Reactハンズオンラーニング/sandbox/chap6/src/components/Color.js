import { FaTrash } from "react-icons/fa";
import StarRating from "./star_rating";

export default function Color({
  id,
  title,
  color,
  rating,
  onRemove = (f) => f,
  onRate = (f) => f,
}) {
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => onRemove(id)}>
        <FaTrash></FaTrash>
      </button>
      <div style={{ height: 50, backgroundColor: color }}></div>
      <StarRating
        selectedStars={rating}
        onRate={(rating) => onRate(id, rating)}
      ></StarRating>
    </section>
  );
}
