import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import moment from "moment";
import { Skeleton } from "./ui/skeleton";

const PostContent = ({ id }: { id: string | undefined }) => {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/post/${id}`);
      return response.data;
    },
    queryKey: ["post"],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <Skeleton className="h-[600px] w-full object-center object-cover rounded-[--radius]" />
        <Skeleton className="w-[40rem] h-10 rounded-full " />
        <Skeleton className="w-[30rem] h-10 rounded-full " />
        <Skeleton className="w-full h-5 rounded-full " />
        <Skeleton className="w-full h-5 rounded-full " />
        <Skeleton className="w-full h-5 rounded-full " />
        <Skeleton className="w-full h-5 rounded-full " />
        <Skeleton className="w-full h-5 rounded-full " />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive">
        Something went wrong, please try again later
      </p>
    );
  }

  return (
    post && (
      <>
        <img
          src={post.image}
          className="max-h-[600px] w-full object-center object-cover rounded-[--radius]"
        />
        <h1 className="mt-10">{post.title}</h1>
        <h3 className="text-muted-foreground mt-10">{post.description}</h3>
        <div className="mt-10 flex flex-row gap-4 border-b border-secondary pb-10">
          <Avatar className="h-16 w-16">
            <AvatarImage src={post.author.imageUrl} />
            <AvatarFallback>
              {post.author.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-row justify-between w-full items-center">
            <div>
              <p className=" font-medium">{post.author.username}</p>
              <span>
                <p className="text-muted-foreground">Talks on {post.topic}</p>
              </span>
            </div>
            <span className="self-end">
              <p className="text-muted-foreground">
                {moment(post.createdAt).fromNow()}
              </p>
            </span>
          </div>
        </div>

        <div
          className="mt-10 pb-5 border-b border-secondary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </>
    )
  );
};

export default PostContent;
