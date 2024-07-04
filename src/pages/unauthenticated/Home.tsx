import { Link } from "react-router-dom";
import FlipLink from "../../components/ui/fliplink";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8 items-center">
      <h1 className="text-center">
        When keyboards can be used not only for coding
      </h1>
      <p className=" p-lead text-center ">
        I like writting shi### code, even more shi#### blogs
      </p>
      <FlipLink href="/posts">POSTS ↗</FlipLink>
    </div>
  );
};

export default Home;
