import { Route, Routes } from "react-router-dom";
import Home from "../Pages/User/Home";
import MovieDeatils from "../Components/MovieDeatils";

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/movie/:id" element={<MovieDeatils />} />
      </Route>
      <Route path="/mobile/movie/:id" element={<MovieDeatils />} />
    </Routes>
  );
}

export default HomeRoutes;
