import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dot, Ellipsis } from "lucide-react";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../api/useAxiosPrivate";

const CommentCard = ({ comment }: { comment: any }) => {
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // To improve
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return axiosPrivate.delete(`/comment/${id}`);
    },
    onError: (error: any) => {
      console.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  async function handleDelete() {
    mutation.mutate(comment._id);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={comment.author.imageUrl} />
          <AvatarFallback>
            {comment.author.username.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="flex flex-row items-center">
          <p className="font-semibold">{comment.author.username}</p>
          <Dot className="text-muted-foreground" />
          <span>
            <p className="text-muted-foreground">
              {moment(comment.createdAt).fromNow()}
            </p>
          </span>
        </span>
      </div>
      <div className="ml-16 p-4 border border-secondary rounded-[--radius] max-w-3xl break-words relative ">
        <div
          dangerouslySetInnerHTML={{ __html: comment.text }}
          className="mr-6"
        />
        {userInfo?.id === comment.author._id && (
          <div className="absolute right-3 top-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
