import { useQuery } from "@tanstack/react-query";

import axios from "../api/axios";
import PostCard from "../components/PostCard";

const Posts = () => {
  const { data: posts, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/post?limit=5");
      return response.data;
    },
    queryKey: ["posts"],
  });

  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <div className="flex flex-1 items-center justify-center flex-col max-w-7xl self-center">
      {posts.map((post: any) => (
        <PostCard key={post._id} item={post} />
      ))}
    </div>
  );
};

export default Posts;
