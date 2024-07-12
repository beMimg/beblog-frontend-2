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

const Profile = () => {
  const firstLetter = "A";
  const username = "belchior1S";
  const joinedUs = "24-22-2023";
  const bio =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores nemo quam esse perspiciatis! Officia voluptates obcaecati perspiciatis perferendis impedit. Consectetur, sit! Eius culpa quis tempora dignissimos.";

  return (
    <div className="flex flex-1 flex-col max-w-7xl items-center justify-center mx-auto w-full h-full ">
      <Card className="max-w-2xl w-full">
        <CardHeader className="bg-background gap-2 mb-5 rounded-[--radius]">
          <CardTitle>
            <div className="bg-primary h-32 w-32 rounded-[--radius]  flex items-center justify-center">
              <p className="text-5xl">{firstLetter}</p>
            </div>
            <p>{username}</p>
          </CardTitle>
          <CardDescription>{bio}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-between gap-4">
          <ModeToggle variant="ghost" />
          <Button variant="ghost">Likes</Button>
          <LogoutDrawer />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
