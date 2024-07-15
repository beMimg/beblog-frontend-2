import { Link, useParams } from "react-router-dom";
import PostContent from "../components/PostContent";
import CommentForm from "../components/forms/CommentForm";
import { useAuth } from "../context/AuthContext";

const Post = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PostContent id={id} />
      <div>
        <h2 className="pt-10 ">Comments</h2>
        {!accessToken ? (
          <p className="text-center text-muted-foreground">
            Please{" "}
            <Link to="/sign-in" className="underline font-medium">
              log in
            </Link>{" "}
            to join the conversation and leave a comment.
          </p>
        ) : (
          <CommentForm />
        )}
      </div>
    </div>
  );
};

export default Post;
