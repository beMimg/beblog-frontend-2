import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dot } from "lucide-react";
import moment from "moment";

const CommentCard = ({ comment }: { comment: any }) => {
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
      <div
        className="ml-16 p-4 border border-secondary rounded-[--radius] max-w-3xl break-words "
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />
    </div>
  );
};

export default CommentCard;
