import { memo, useCallback, useContext, useState } from "react";
import Button from "../Components/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MovieDetailsContext } from "../Context/MovieDetailsContext";

const Rating = memo(function Rating({ id }) {
  const [selectedRating, setSelectedRating] = useState("");
  const { movies, setMovies } = useContext(MovieDetailsContext);
  const totalRating = 5;
  const starArray = [];
  const isLogged = useSelector((s) => s.loggedUser.id);
  const navigate = useNavigate();

  for (let i = 0; i < totalRating; i++) {
    starArray.push(
      <svg
        viewBox="0 0 1024 1024"
        fill={`${i < selectedRating ? "yellow" : "gray"}`}
        className={`w-9`}
        id={i}
      >
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />{" "}
      </svg>
    );
  }

  const updateRatedMovie = useCallback(
    () =>
      movies.map((movie) => {
        if (movie.id === id) {
          const isAlreadyRatedUser = movie.rating?.find(
            (rating) => rating.userId === isLogged
          );
          if (!isAlreadyRatedUser) {
            return {
              ...movie,
              rating: [
                ...(movie.rating || []),
                { userId: isLogged, rating: selectedRating },
              ],
            };
          } else {
            const otherRating = movie.rating.filter(
              (rating) => rating.userId !== isLogged
            );
            return {
              ...movie,
              rating: [
                ...otherRating,
                { userId: isLogged, rating: selectedRating },
              ],
            };
          }
        }
        return movie;
      }),
    [id, isLogged, movies, selectedRating]
  );

  const handleClick = (index) => {
    console.log(index + 1);
    setSelectedRating(index + 1);
  };

  const handleSubmit = useCallback(() => {
    if (!isLogged) {
      alert("u are not logged,click to loggin");
      navigate("/login");

      return;
    }
    if (!selectedRating) {
      alert("u need to select a rating");
      return;
    }
    updateRatedMovie();

    localStorage.setItem("movies", JSON.stringify(updateRatedMovie()));
    setMovies(updateRatedMovie());
  }, [isLogged, navigate, selectedRating, setMovies, updateRatedMovie]);

  const star = starArray.map((s, index) => (
    <div key={index} id={index} className="" onClick={() => handleClick(index)}>
      {s}
    </div>
  ));
  return (
    <div className="w-[80%] flex flex-col items-center">
      <div className="flex">{star}</div>
      <Button width={40} bold={true} onHandleSubmit={handleSubmit}>
        Add Rating
      </Button>
    </div>
  );
});

export default Rating;
