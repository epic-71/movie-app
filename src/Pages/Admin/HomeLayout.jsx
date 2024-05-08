import { useCallback, useEffect, useState } from "react";
import Menue from "../../Components/Menue";

import { Outlet } from "react-router-dom";

function HomeLayout() {
  const [menue, setMenue] = useState(false);
  const tab = 768;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleMenue = useCallback(() => {
    console.log("clicked");
    setMenue((m) => !m);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (window.innerWidth >= tab) setMenue(false);
  }, [innerWidth]);

  return (
    <div className="relative flex  w-full h-screen">
      <Menue menue={menue} handleMenue={handleMenue} innerWidth={innerWidth} />
      {/* <div className="bg-yellow-100 w-full text-black ml-48">brveibne</div> */}
      <div
        className={`${
          menue && "hidden"
        } absolute  bg-primary_black w-full  h-full  `}
      >
        <svg
          className="w-12 absolute right-5 top-5 tab:hidden"
          onClick={handleMenue}
          fill="none"
          viewBox="0 0 24 24"
          style={{ zIndex: 5 }}
        >
          <path
            fill="white"
            d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM4 18a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM5 11a1 1 0 100 2h8a1 1 0 100-2H5z"
          />
        </svg>

        <div className="absolute right-0 top-0 bg-primary_black flex justify-center items-center w-full tab:w-[82%] h-screen overflow-auto px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
