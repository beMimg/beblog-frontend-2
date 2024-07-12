import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const Footer = () => {
  return (
    <footer className="  w-full bg-card px-4 py-10 text-muted-foreground">
      <div className="max-w-7xl mx-auto grid grid-rows-2 gap-4">
        <div className="w-full flex flex-row justify-between">
          <h4>beBlog # 2024</h4>
          <ModeToggle variant="ghost" />
        </div>
        <div className="flex-row flex justify-between ">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About</Link>
          <a target="_blank" href="https://www.bemimg.com">
            Website
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
