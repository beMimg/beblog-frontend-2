import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  item,
}: {
  item: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    topic: string;
    image?: string;
  };
}) => {
  const navigation = useNavigate();
  function handleSeePostClick() {
    console.log(item._id);
    navigation(`/post/${item._id}`, { replace: true });
  }

  return (
    <div
      key={item.title}
      className="flex flex-row w-full gap-10 my-10 md:my-20"
    >
      <span className="flex flex-col flex-1  justify-between gap-6">
        <span>
          <h2>{item.title}</h2>
          <span>
            <p className="text-muted-foreground">{item.topic}</p>
          </span>
        </span>

        <p className=" p-lead ">{item.description}</p>
        <span className="flex flex-row w-full justify-between items-center ">
          <Button onClick={handleSeePostClick} size={"lg"}>
            See now <ArrowUpRight />
          </Button>
          <span>
            <p className="text-muted-foreground">
              {moment(item.createdAt).fromNow()}
            </p>
          </span>
        </span>
      </span>
      <div className="w-[300px] h-[300px] hidden md:flex ">
        <img
          src={item.image}
          className=" object-cover object-center rounded-[--radius] w-full"
        />
      </div>
    </div>
  );
};

export default PostCard;
