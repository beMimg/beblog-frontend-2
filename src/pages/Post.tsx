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
import CommentSection from "../components/CommentSection";

const Post = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-[3fr,1fr] gap-6">
      <div>
        <PostContent id={id} />
        <CommentSection id={id} />
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
