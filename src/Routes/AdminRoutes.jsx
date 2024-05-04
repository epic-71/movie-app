import { Route, Routes } from "react-router-dom";
import HomeLayout from "../Pages/Admin/HomeLayout";
import Dashbord from "../Pages/Admin/Dashbord";
import Home from "../Pages/Admin/Home";
import Movies from "../Pages/Admin/Movies";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/users" element={<div>users</div>}/>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
