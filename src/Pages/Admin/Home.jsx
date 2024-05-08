import { useContext, useMemo } from "react";
import MovieCard from "../../Components/MovieCard";
import { MovieDetailsContext } from "../../Context/MovieDetailsContext";
import { useSelector } from "react-redux";
import UserCard from "../../Components/UserCard";

function Home() {
  const data = useContext(MovieDetailsContext);
  const { movies } = data;
  const user = useSelector((s) => s.user);

  const memoizedTopUser = useMemo(() => {
    return user.slice(0, 4);
  }, [user]);
  return (
    <div
      className="flex flex-col items-center text-text_white text-2xl  w-[95%] h-full font-bold pt-16"
      style={{ zIndex: 6 }}
    >
      <h1>
        Welcome To <span className="text-text_yellow">MOVIE APP</span> Admin
        Page
      </h1>
      <div className="mt-10  grid gap-2 place-items-center">
        <h2 className="italic">TOP USERS</h2>
        <div className=" grid grid-cols-2 gap-3">
          {memoizedTopUser.map((u) => (
            <UserCard key={u.id} name={u.userid} />
          ))}
        </div>
      </div>
      <div className="mt-14 space-y-5">
        <h3 className="italic">Top Rewieved</h3>
        <div className=" w-full  h-min grid gap-y-4 grid-cols-2 tab:grid-cols-3 laptop:grid-cols-4 justify-items-center">
          {movies.map((movie) => (
            <MovieCard key={movie.id} image={movie.image} name={movie.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
