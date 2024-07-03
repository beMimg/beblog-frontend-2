import { Menu, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const isUserLoggedIn = false;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 639) {
        setIsDropDownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="py-4 inset-x-0 bg-slate-400">
      <nav className="flex items-center mx-auto max-w-7xl justify-between px-4">
        <h2>BeBlog</h2>
        {/* Desktop Devices */}
        <div className="hidden sm:flex items-center gap-3">
          {!isUserLoggedIn ? (
            <>
              <a href="/">Posts</a>
              <a href="/">About</a>
              <a href="/">Sign up</a>
              <a href="/">Sign in</a>
            </>
          ) : (
            <>
              <a href="/">Posts</a>
              <a href="/">Profile</a>
            </>
          )}

          {/* Mobile Devices */}
        </div>
        <div className="flex sm:hidden">
          <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
            <DropdownMenuTrigger>
              <Menu
                className={`${
                  isDropDownOpen ? "rotate-90" : ""
                } transition-all`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {!isUserLoggedIn ? (
                <>
                  <DropdownMenuLabel>Posts</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign Up</DropdownMenuItem>
                  <DropdownMenuItem>Sign In</DropdownMenuItem>
                  <DropdownMenuItem>About</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Posts</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
