import { Menu } from "lucide-react";
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
        <div className="hidden sm:flex items-center gap-5 text-xl font-medium">
          {!isUserLoggedIn ? (
            <>
              <Link to="/posts">Posts</Link>
              <Link to="/sign-up">Sign up</Link>
              <Link to="/sign-in">Sign in</Link>
            </>
          ) : (
            <>
              <Link to="/posts">Posts</Link>
              <Link to="/profile">Profile</Link>
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
                  <DropdownMenuItem>
                    <Link to="/posts">Posts</Link>
                  </DropdownMenuItem>
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
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/posts">Posts</Link>
                  </DropdownMenuItem>
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
