import { Link, useParams } from "react-router-dom";
import PostContent from "../components/PostContent";
import CommentForm from "../components/forms/CommentForm";
import { useAuth } from "../context/AuthContext";
import Comments from "../components/Comments";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Post = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();

  return (
    <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-[3fr,1fr] gap-6">
      <div>
        <PostContent id={id} />
        <div>
          <h2 className="pt-10 ">Comments</h2>
          {!accessToken ? (
            <p className="text-center text-muted-foreground">
              Please{" "}
              <Link to="/sign-in" className="underline font-medium">
                log in
              </Link>{" "}
              to join the conversation and leave a comment.
            </p>
          ) : (
            <CommentForm />
          )}
          <Comments id={id} />
        </div>
      </div>
      <aside className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
};

export default Post;
