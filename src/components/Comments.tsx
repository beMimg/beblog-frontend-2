import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import CommentCard from "./CommentCard";
import { Skeleton } from "./ui/skeleton";

const Comments = ({ id }: { id: string | undefined }) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/comment/post/${id}`);
      console.log(response);
      return response.data;
    },
    queryKey: ["comments"],
  });

  if (comments && comments.length === 0) {
    return <p className="p-lead pt-10">Be the first to comment on this post</p>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 mt-10">
        <Skeleton className="w-[100px] h-4 rounded-[--radius]" />
        <Skeleton className="w-full h-4 rounded-[--radius]" />
        <Skeleton className="w-[100px] h-4 rounded-[--radius]" />
        <Skeleton className="w-full h-4 rounded-[--radius]" />
        <Skeleton className="w-[100px] h-4 rounded-[--radius]" />
        <Skeleton className="w-full h-4 rounded-[--radius]" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-10 text-destructive">
        Couldn't fetch comments, please try again later
      </p>
    );
  }

  return (
    <div className="mt-10 flex flex-col gap-10">
      {comments &&
        comments.map((comment: any) => <CommentCard comment={comment} />)}
    </div>
  );
};

export default Comments;
