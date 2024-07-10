import imgTest from "../assets/personal-website.png";
import { Button } from "../components/ui/button";
import { ArrowUpRight } from "lucide-react";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    createdAt: "12-231-2312",
    topic: "Technology",
    img: imgTest,
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];

const Posts = () => {
  return (
    <div className="flex flex-1 items-center justify-center flex-col max-w-7xl self-center">
      {content.map((item) => (
        <div key={item.title} className="flex flex-row gap-10 my-10 lg:my-20">
          <span className="flex flex-col flex-1  justify-between gap-6">
            <span>
              <h2>{item.title}</h2>
              <span>
                <p className="text-muted-foreground">{item.topic}</p>
              </span>
            </span>
            <h4 className=" text-muted-foreground">{item.description}</h4>
            <span className="flex flex-row w-full justify-between items-center ">
              <Button size={"lg"}>
                See now <ArrowUpRight />
              </Button>
              <span>
                <p className="text-muted-foreground">{item.createdAt}</p>
              </span>
            </span>
          </span>
          <div className="max-w-[600px] hidden lg:flex ">
            <img src={item.img} className=" rounded-t-[--radius]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
