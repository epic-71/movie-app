import { memo } from "react";
import Logo from "./Logo";
import Search from "./Search";

const NavHome = memo(function NavHome({ search, onHandleValue }) {
  return (
    <nav className="bg-primary_yellow opacity-90 w-full tab:w-[70%] h-20 tab:h-16 rounded-md px-3 flex  items-center justify-between gap-3">
      <Logo />
      <Search search={search} onHandleValue={onHandleValue} />
    </nav>
  );
});

export default NavHome;
