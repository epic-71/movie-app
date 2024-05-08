import { useResizable } from "react-resizable-layout";
import NavHome from "../../Components/NavHome";
import Resizable from "../../Components/Resizable";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MovieDetailsContext } from "../../Context/MovieDetailsContext";
import MovieCard from "../../Components/MovieCard";
import { Outlet, useParams } from "react-router-dom";
import WelcomeNote from "../../Components/WelcomeNote";

function Home() {
  const checkLiveWidth = window.innerWidth;
  const refWidth = useRef(null);
  const [liveWidth, setLiveWidth] = useState(checkLiveWidth);
  const { movies } = useContext(MovieDetailsContext);
  const [isSelectedMovie, setIsSelectedMovie] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState();
  const params = useParams().id;

  const { isDragging, position, splitterProps } = useResizable({
    axis: "x",
    initial: 400,
    min: 100,
    max: 1000,
  });

  const movieList = useMemo(() => {
    if (!debouncedValue) {
      const mapedMovies = movies.map((m) => (
        <MovieCard
          key={m.id}
          name={m.title}
          image={m.image}
          text="white"
          id={m.id}
          screen={liveWidth}
        />
      ));
      return mapedMovies;
    } else {
      const isInclude = movies.filter((m) => {
        return m.title.toLowerCase().includes(debouncedValue.toLowerCase());
      });
      const print = isInclude.map((m) => (
        <MovieCard
          key={m.id}
          name={m.title}
          image={m.image}
          text="white"
          id={m.id}
          screen={liveWidth}
        />
      ));
      return print;
    }
  }, [movies, liveWidth, debouncedValue]);

  const handleIsSelect = useCallback(() => {
    setIsSelectedMovie((s) => !s);
  },[])

  const handleValue = useCallback((e) => {
    setSearch(e.target.value);
  },[])

  useEffect(() => {
    const handleResize = () => {
      refWidth.current = window.innerWidth;
      setLiveWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const delayTimeOutId = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => clearTimeout(delayTimeOutId);
  }, [search]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-home_bg bg-center tab:bg-top bg-cover bg-no-repeat tab:p-6 flex flex-col items-center gap-3">
      <NavHome search={search} onHandleValue={handleValue} />
      <div className={`w-full h-screen flex justify-center`}>
        {liveWidth < 768 ? (
          <div
            className={`${
              isSelectedMovie && "hidden"
            } bg-primary_black  bg-opacity-90 w-full  h-screen rounded-md `}
            style={{ width: "100%" }}
            onClick={handleIsSelect}
          >
            <div
              className={`absolute overflow-scroll pt-4 pb-24 w-full h-full grid place-items-center gap-5 grid-cols-1`}
            >
              {movieList}
            </div>
          </div>
        ) : (
          <div
            className={` bg-primary_black bg-opacity-90 w-full  h-full rounded-md grid place-items-center`}
            style={{ width: `${position / 10 + 20}%` }}
          >
            <div className="w-[70%] h-screen overflow-scroll  pt-5 pb-24 flex flex-col items-center gap-3">
              {movieList}
            </div>
          </div>
        )}
        <Resizable isDragging={isDragging} {...splitterProps} />
        <div
          className={`${
            !isSelectedMovie ? "hidden" : ""
          } tab:block bg-primary_black bg-opacity-90 w-full h-full`}
        >
          <svg
            baseProfile="tiny"
            viewBox="0 0 24 24"
            fill="white"
            className="tab:hidden w-7"
            onClick={handleIsSelect}
            // style={{zIndex:100}}
          >
            <path d="M19.164 19.547c-1.641-2.5-3.669-3.285-6.164-3.484V17.5c0 .534-.208 1.036-.586 1.414-.756.756-2.077.751-2.823.005l-6.293-6.207a1 1 0 010-1.425l6.288-6.203c.754-.755 2.073-.756 2.829.001.377.378.585.88.585 1.414v1.704c4.619.933 8 4.997 8 9.796v1a.999.999 0 01-1.836.548zm-7.141-5.536c2.207.056 4.638.394 6.758 2.121a7.985 7.985 0 00-6.893-6.08C11.384 9.996 11 10 11 10V6.503l-5.576 5.496 5.576 5.5V14l1.023.011z" />
          </svg>
          {params ? <Outlet /> : <WelcomeNote />}
        </div>
      </div>
    </div>
  );
}

export default Home;
