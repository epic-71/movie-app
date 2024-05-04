import { memo } from "react";
import { Link } from "react-router-dom";

const MovieCard = memo(function MovieCard({ image, name, text = "white", id }) {
  return (
    <Link to={`/movie/${id}`} className=" w-[40%] flex flex-col">
      <img className="w-[100%]" src={image} alt="" />
      <h2 className={`text-${text} text-base text-center`}>{name}</h2>
    </Link>
  );
});

export default MovieCard;
