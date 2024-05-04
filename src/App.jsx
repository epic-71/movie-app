import { Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import Login from "./Pages/User/Login";
import SignUp from "./Pages/User/SignUp";
import AdminRoutes from "./Routes/AdminRoutes";
import HomeRoutes from "./Routes/HomeRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<div>page not found</div>} />
    </Routes>
  );
}

export default App;
