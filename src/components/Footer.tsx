import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const Footer = () => {
  return (
    <footer className="border-t border-secondary  w-full  px-4 py-4 text-muted-foreground">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 sm:grid sm:grid-cols-3 items-center ">
        <p>
          Made by{" "}
          <a href="https://www.bemimg.com" className="underline">
            bemimg
          </a>
        </p>
        <div className="flex-row flex justify-between gap-6 ">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
          <a target="_blank" href="https://www.bemimg.com">
            Website
          </a>
        </div>
        <div className="justify-self-end">
          <ModeToggle variant="ghost" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
