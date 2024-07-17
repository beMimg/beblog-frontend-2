import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { accessToken } = useAuth();

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
        <div className="hidden sm:flex items-center gap-8  font-medium">
          {!accessToken ? (
            <>
              <Link to="/posts" className="menu__link">
                Posts
              </Link>
              <Link to="/sign-up" className="menu__link">
                Sign up
              </Link>
              <Link to="/sign-in" className="menu__link">
                Sign in
              </Link>
            </>
          ) : (
            <>
              <Link to="/posts" className="menu__link">
                Posts
              </Link>
              <Link to="/profile" className="menu__link">
                Profile
              </Link>
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
              {!accessToken ? (
                <>
                  <DropdownMenuItem>
                    <Link to="/posts" className="w-full">
                      Posts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDropDownOpen(false)}>
                    <Link to="/sign-up" className="w-full">
                      Sign up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to="/sign-in"
                      onClick={() => setIsDropDownOpen(false)}
                      className="w-full"
                    >
                      Sign in
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/posts" className="w-full">
                      Posts
                    </Link>
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
