import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const Footer = () => {
  return (
    <footer className="  w-full bg-primary-foreground p-4 h-[150px]">
      <div className="max-w-7xl mx-auto grid grid-rows-2 h-full">
        <div className="w-full flex flex-row justify-between">
          <h4>beBlog # 2024</h4>
          <ModeToggle />
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
