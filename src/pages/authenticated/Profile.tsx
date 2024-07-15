import { useQuery, useQueryClient } from "@tanstack/react-query";
import LogoutDrawer from "../../components/LogoutDrawer";
import { ModeToggle } from "../../components/ModeToggle";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import moment from "moment";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import EditProfile from "../../components/EditProfile";
import { Skeleton } from "../../components/ui/skeleton";
import { Link } from "react-router-dom";

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryFn: async () => {
      const response = await axiosPrivate.get("/user/self");
      return response.data;
    },
    queryKey: ["user"],
  });

  const handleProfileUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <div className="flex flex-1 flex-col max-w-7xl items-center justify-center mx-auto w-full h-full ">
      <Card className="max-w-2xl w-full ">
        {user ? (
          <>
            <CardHeader className="gap-2 mb-5 rounded-[--radius] flex flex-row justify-between">
              <Avatar className="h-40 w-40">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user.username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <EditProfile user={user} onProfileUpdate={handleProfileUpdate} />
            </CardHeader>

            <CardContent>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>
                Joined {moment(user.createdAt).fromNow()}
              </CardDescription>
              <CardDescription>
                {user.bio ? user.bio : "Something about me"}
              </CardDescription>
              <Badge className="self-start mt-[24px]">{user.role}</Badge>
            </CardContent>

            <CardFooter className="flex flex-row items-center justify-between gap-2 ">
              <ModeToggle variant="ghost" />
              <Button variant="ghost">Likes</Button>
              <LogoutDrawer />
              {user.role === "admin" && (
                <Button variant="ghost">
                  <Link to="/create-post">Create Post</Link>
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="gap-2 mb-5 rounded-[--radius] flex flex-row justify-between">
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Skeleton className="h-4 w-[40%] rounded-full" />
              <Skeleton className="h-4 w-[40%] rounded-full" />
              <Skeleton className="h-4 w-[80%] rounded-full" />
              <Skeleton className="h-4 w-[10%] rounded-full" />
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-between gap-2 ">
              <Skeleton className="h-4 w-[10%] rounded-full" />
              <Skeleton className="h-4 w-[10%] rounded-full" />
              <Skeleton className="h-4 w-[10%] rounded-full" />
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default Profile;
