import FlipLink from "../components/ui/fliplink";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { LinkPreview } from "../components/ui/link-preview";
import personalWebsitePng from "../assets/personal-website.png";
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";

const Home = () => {
  const { data: posts, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/post?limit=5");
      console.log(response.data);
      return response.data;
    },
    queryKey: ["posts"],
  });

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-8 items-center">
      <h1 className="text-center">
        Welcome to{" "}
        <LinkPreview
          className="underline"
          url="https://www.bemimg.com"
          imageSrc={personalWebsitePng}
        >
          beMimg's
        </LinkPreview>{" "}
        Code Circus
      </h1>
      <p className=" p-lead text-center ">
        Where my logic is as lost as an alien in a shopping mall, and my blogs?
        They’re out of this world!
      </p>
      <FlipLink href="/posts">SEE POSTS ↗</FlipLink>

      <div className=" overflow-hidden w-full flex items-center justify-center">
        <InfiniteMovingCards items={posts} direction="right" speed="normal" />
      </div>
    </div>
  );
};

export default Home;
