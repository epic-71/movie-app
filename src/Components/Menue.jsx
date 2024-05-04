import { Link } from "react-router-dom";
import Logo from "./Logo";
import ProfileCard from "./ProfileCard";

function Menue({ menue, handleMenue, innerWidth }) {
  const tab = 768;
  return (
    <div>
      {(menue || innerWidth >= tab) && (
        <>
          {menue && (
            <svg
              viewBox="0 0 21 21"
              className="w-12 absolute right-5 top-5 tab:hidden"
              onClick={handleMenue}
              fill="black"
              style={{ zIndex: 100 }}
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.5 7.5l6 6M13.5 7.5l-6 6" />
              </g>
            </svg>
          )}

          <div
            className="fixed overflow-hidden flex flex-col items-center bg-primary_yellow w-full tab:w-[18%] h-screen  p-4"
            style={{ zIndex: 10 }}
          >
            <Logo />
            <ProfileCard />
            <ul className="w-full h-min px-10 tab:px-4 cursor-pointer">
              <li className="border-b border-primary_black ">
                <Link to={""}>Home</Link>
              </li>
              <li className="border-b border-primary_black ">
                <Link to={"/admin/users"}>Users</Link>
              </li>
              <li className="border-b border-primary_black ">
                <Link to={"/admin/movies"}>Movies</Link>
              </li>
              <li className="border-b border-primary_black ">
                <Link to={"/admin/dashbord"}>Dashboard</Link>
              </li>
              <li className="border-b border-primary_black ">
                <Link to={"/settings"}>Settings</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Menue;
