import { useQuery } from "@tanstack/react-query";
import LogoutDrawer from "../../components/LogoutDrawer";
import { ModeToggle } from "../../components/ModeToggle";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data: user, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosPrivate.get("/user/self");
      console.log(response);
      return response.data;
    },
    queryKey: ["user"],
  });

  return (
    <div className="flex flex-1 flex-col max-w-7xl items-center justify-center mx-auto w-full h-full ">
      <Card className="max-w-2xl w-full ">
        <CardHeader className="gap-2 mb-5 rounded-[--radius]">
          <CardTitle>
            <div className="flex flex-row justify-between">
              <Avatar className="h-40 w-40">
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUUk1-q7FOStOQCqSfzWMHkQRuDynMiGQO4d8054frzmPvkhc55BrVUP-IR2a86aiYZg&usqp=CAU" />
                <AvatarFallback>
                  {user && user.username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <EditProfile />
            </div>
            <p>{user && user.username}</p>
          </CardTitle>
          <CardDescription>
            {user && `Joined ${moment(user.createdAt).fromNow()}`}
          </CardDescription>
          <CardDescription>
            {user && user.bio ? user.bio : "Something about me"}
          </CardDescription>
          <Badge className="self-start">{user && user.role}</Badge>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between gap-2 ">
          <ModeToggle variant="ghost" />
          <Button variant="ghost">Likes</Button>
          <LogoutDrawer />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
