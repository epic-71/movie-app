import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MovieDetailsContext } from "../../Context/MovieDetailsContext";
import { useFormik } from "formik";
import { v4 as UUIDV4 } from "uuid";
import * as Yup from "yup";
import MovieCard from "../../Components/MovieCard";
import Search from "../../Components/Search";

function Movies() {
  const { movies, setMovies } = useContext(MovieDetailsContext);
  const [needAddMovie, setNeedAddMovie] = useState(false);
  const [editMovie, setEditMovie] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState();
  const formik = useFormik({
    initialValues: {
      title: "",
      cast: "",
      image: "",
      demo: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("Required")
        .min(2, "title must need atleast 2 characters"),
      cast: Yup.string()
        .required("Required")
        .min(2, "title must need atleast 2 characters"),
      image: Yup.string()
        .required("Required")
        .min(2, "title must need atleast 2 characters"),
    }),
  });

  const { title, cast, image } = formik.values;

  const {
    title: titleError,
    cast: castErrors,
    image: imageError,
  } = formik.errors;

  const {
    title: titleTouched,
    cast: castTouched,
    image: imageTouched,
  } = formik.touched;

  const handleSubmit = useCallback(() => {
    if (!editMovie) {
      const newMovie = {
        id: UUIDV4(),
        title,
        cast,
        image,
      };

      const updatedMovieList = [...movies, newMovie];
      localStorage.setItem("movies", JSON.stringify(updatedMovieList));
      setMovies(updatedMovieList);
    } else {
      const newMovie = {
        id: editMovie.id,
        title,
        cast,
        image,
      };
      const updatedMovieList = movies.map((movie) => {
        if (movie.id === editMovie.id) return newMovie;
        return movie;
      });
      localStorage.setItem("movies", JSON.stringify(updatedMovieList));
      setMovies(updatedMovieList);
    }
    setNeedAddMovie(false);
  }, [cast, editMovie, image, movies, setMovies, title]);

  useEffect(() => {
    const delayTimeOutId = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => clearTimeout(delayTimeOutId);
  }, [search]);

  const handlePlus = useCallback(() => {
    setNeedAddMovie((s) => !s);
  }, []);

  const handleValue = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleEdit = useCallback(
    (movie) => {
      setNeedAddMovie(true);
      setEditMovie(movie);
      formik.initialValues.title = movie.title;
      formik.initialValues.cast = movie.cast;
    },
    [formik.initialValues]
  );
  const handleDelete = useCallback(
    (movieId) => {
      const updatedMovieList = movies.filter((movie) => movie.id !== movieId);
      localStorage.setItem("movies", JSON.stringify(updatedMovieList));
    },
    [movies]
  );

  const movieList = useMemo(() => {
    if (!debouncedValue) {
      const mapedMovies = movies.map((m) => (
        <div key={m.id} className="w-full h-full flex justify-center ">
          <MovieCard
            key={m.id}
            name={m.title}
            image={m.image}
            text="white"
            id={m.id}
          />
          <div>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="1em"
              width="1em"
              onClick={() => handleEdit(m)}
            >
              <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10h-2a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8V2m6.78 1a.69.69 0 00-.48.2l-1.22 1.21 2.5 2.5L20.8 5.7c.26-.26.26-.7 0-.95L19.25 3.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L9 12.5V15h2.5l7.37-7.38-2.5-2.5z" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="1em"
              width="1em"
              onClick={() => handleDelete(m.id)}
            >
              <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12m2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12M15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
            </svg>
          </div>
        </div>
      ));
      return mapedMovies;
    } else {
      const isInclude = movies.filter((m) => {
        return m.title.toLowerCase().includes(debouncedValue.toLowerCase());
      });
      const print = isInclude.map((m) => (
        <div key={m.id} className="w-full h-full flex justify-center ">
          <MovieCard
            key={m.id}
            name={m.title}
            image={m.image}
            text="white"
            id={m.id}
          />
          <div>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="1em"
              width="1em"
              onClick={() => handleEdit(m)}
            >
              <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10h-2a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8V2m6.78 1a.69.69 0 00-.48.2l-1.22 1.21 2.5 2.5L20.8 5.7c.26-.26.26-.7 0-.95L19.25 3.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L9 12.5V15h2.5l7.37-7.38-2.5-2.5z" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="1em"
              width="1em"
              onClick={() => handleDelete(m.id)}
            >
              <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12m2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12M15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
            </svg>
          </div>
        </div>
      ));
      return print;
    }
  }, [movies, debouncedValue, handleEdit, handleDelete]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-5 mt-20  ">
      <Search Search={search} onHandleValue={handleValue} />
      <div className="" onClick={handlePlus}>
        {!needAddMovie ? (
          <svg className="text-white w-10" fill="none" viewBox="0 0 24 24">
            <path
              fill="white"
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 1024 1024" fill="white" className="w-10">
            <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" />
            <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
          </svg>
        )}
      </div>
      {needAddMovie && (
        <form
          className="w-full h-[150%]  tab:w-[50%] flex flex-col items-center justify-center"
          onSubmit={formik.handleSubmit}
        >
          <Input
            label={"Title"}
            id={"title"}
            name={"title"}
            onHandleValue={formik.handleChange}
            onHandleBlur={formik.handleBlur}
            placeHolder={"One Piece"}
            type={"text"}
            value={formik.values.title}
            error={titleError}
            touched={titleTouched}
            div_width={80}
            div_height={30}
            inputHeight={40}
          />
          <Input
            name={"cast"}
            label={"Cast"}
            placeHolder={"eg:-Epic,John"}
            id={"cast"}
            value={formik.values.cast}
            onHandleBlur={formik.handleBlur}
            onHandleValue={formik.handleChange}
            type={"text"}
            error={castErrors}
            touched={castTouched}
            div_width={80}
            div_height={30}
            inputHeight={40}
          />
          <Input
            name={"image"}
            label={"Image"}
            placeHolder={"Paste Image URL"}
            id={"image"}
            value={formik.values.image}
            onHandleBlur={formik.handleBlur}
            onHandleValue={formik.handleChange}
            type={"text"}
            error={imageError}
            touched={imageTouched}
            div_width={80}
            div_height={30}
            inputHeight={40}
          />
          <Button
            width={50}
            bold={true}
            type={"button"}
            onHandleSubmit={handleSubmit}
          >
            Add to List
          </Button>
        </form>
      )}
      <div className=" pt-4 pb-5 w-full h-full grid grid-cols-1 tab:grid-cols-2 laptop:grid-cols-3 place-items-center overflow-scroll">
        {movieList}
      </div>
    </div>
  );
}

export default Movies;
