import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import useAxiosPrivate from "../api/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

// if borders === true render borders. conditianal styiling depending on
// rendering in Post or PostContent
const LikePost = ({
  post,
  userId,
}: {
  post: any;
  userId: string | undefined;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  // First, let's check if the post likes include the user's _id.
  // This check will be useful for conditional HTTP requests, determining whether to like or dislike a post,
  // as well as for determining the color of the heart icon representing the like status.

  const isLiked = post.likes.includes(userId);

  const queryClient = useQueryClient();
  const handlePostLike = async () => {
    try {
      setLoading(true);
      setError(false);
      if (!isLiked) {
        const response = await axiosPrivate.post(`/post/${post._id}/like`);
        if (response.status === 201) {
          queryClient.invalidateQueries({ queryKey: ["post"] });
        }
      } else {
        const response = await axiosPrivate.delete(`/post/${post._id}/like`);
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["post"] });
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-destructive">Coudn't fetch likes.</p>;

  return (
    <Button
      variant={"ghost"}
      onClick={handlePostLike}
      disabled={loading}
      className="cursor-pointer disabled: mt-10 flex flex-row items-center gap-2 disabled:text-muted  "
    >
      <FaHeart
        className={`${
          isLiked ? "text-red-500" : "text-muted-foreground"
        } text-xl`}
      />
      <span>
        <p className="text-muted-foreground">
          {post.likes.length === 0 ? "" : post.likes.length}
        </p>
      </span>
    </Button>
  );
};

export default LikePost;
