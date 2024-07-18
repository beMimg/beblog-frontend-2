import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../api/useAxiosPrivate";
import { useQueryClient } from "@tanstack/react-query";

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
        queryClient.invalidateQueries({ queryKey: ["post"] });
      } else {
        const response = await axiosPrivate.delete(`/post/${post._id}/like`);
        queryClient.invalidateQueries({ queryKey: ["post"] });
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center gap-1 mt-10">
      <button
        onClick={handlePostLike}
        disabled={loading}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <FaHeart
          className={isLiked ? "text-red-500" : "text-muted-foreground"}
        />
      </button>
      <p className="text-muted-foreground">
        {post.likes.length === 0 ? "" : post.likes.length}
      </p>
    </div>
  );
};

export default LikePost;
