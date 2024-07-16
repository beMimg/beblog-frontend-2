import { useParams } from "react-router-dom";
import PostContent from "../components/PostContent";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import CommentSection from "../components/CommentSection";
import FloatingPhone from "../components/ui/phone";
import { useAuth } from "../context/AuthContext";

const Post = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();

  return (
    <div className="max-w-7xl mx-auto w-full lg:grid lg:grid-cols-[3fr,1fr] gap-6 relative">
      <div>
        <PostContent id={id} />
        <CommentSection id={id} />
      </div>
      <aside className="hidden lg:flex flex-col gap-10 lg:sticky top-[50px] self-start ">
        <div className="hidden  xl:grid place-items-end ">
          <FloatingPhone />
        </div>
        <Card className="hidden lg:grid xl:hidden">
          <CardHeader>
            <CardTitle>Hi {userInfo?.username}</CardTitle>
            <CardDescription>I would love to be in touch.</CardDescription>
          </CardHeader>
          <CardContent>
            Would you like to debate on something you saw here?
          </CardContent>
          <CardFooter>
            <a
              href="mailto:bemimg.dev@gmail.com"
              className="hover:underline transition-all"
            >
              Contact me
            </a>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
};

export default Post;
