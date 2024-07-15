import { useParams } from "react-router-dom";
import PostContent from "../components/PostContent";

const Post = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PostContent id={id} />
    </div>
  );
};

export default Post;
