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
    <header className="p-4 inset-x-0 ">
      <nav className="flex items-center mx-auto max-w-7xl justify-between ">
        <Link to="/">
          <h1>BeBlog</h1>
        </Link>
        {/* Desktop Devices */}
        <div className="hidden sm:flex items-center gap-5 text-xl">
          {!isUserLoggedIn ? (
            <>
              <a href="/">Posts</a>
              <a href="/">About</a>
              <Link to="/sign-up">Sign up</Link>
              <Link to="/sign-in">Sign in</Link>
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
                  <DropdownMenuItem onClick={() => setIsDropDownOpen(false)}>
                    <Link to="/sign-up">Sign up</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to="/sign-in"
                      onClick={() => setIsDropDownOpen(false)}
                    >
                      Sign in
                    </Link>
                  </DropdownMenuItem>
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
