import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailsContext } from "../Context/MovieDetailsContext";
import MovieList from "./MovieList";

function MovieDeatils() {
  const movieId = useParams().id;
  const movies = useContext(MovieDetailsContext).movies;
  const selectedMovie = movies.find((m) => m.id === movieId);
  const totlaRating = selectedMovie.rating?.length;
  const rating =
    selectedMovie.rating?.reduce((total, rating) => total + rating.rating, 0) /
      totlaRating || "Not Rated";
  console.log(movies[0].rating)

  return (
    <div className=" w-full h-full">
      <MovieList
        id={selectedMovie.id}
        key={selectedMovie.id}
        name={selectedMovie.title}
        image={selectedMovie.image}
        cast={selectedMovie.cast}
        rating={rating}
      />
    </div>
  );
}

export default MovieDeatils;
