import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-gray-100  w-full p-4 h-[150px]">
      <div className="max-w-7xl mx-auto grid grid-rows-2 h-full">
        <h4>beBlog # 2024</h4>
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
