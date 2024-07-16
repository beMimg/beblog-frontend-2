import { useAuth } from "../context/AuthContext";
import CommentForm from "./forms/CommentForm";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

const CommentSection = ({ id }: { id: string | undefined }) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/comment/post/${id}`);
      return response.data;
    },
    queryKey: ["comments"],
  });

  // Called when the user submits the comment, refresh the comments to be up to date.
  const handleCommentsUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  };

  return (
    <div>
      <h2 className="pt-10">Comments</h2>

      {!accessToken ? (
        <p className="text-center text-muted-foreground">
          Please{" "}
          <Link to="/sign-in" className="underline font-medium">
            log in
          </Link>{" "}
          to join the conversation and leave a comment.
        </p>
      ) : (
        <CommentForm id={id} />
      )}
      <Comments comments={comments} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default CommentSection;
