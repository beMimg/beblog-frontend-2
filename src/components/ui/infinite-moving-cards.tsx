import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    _id: string;
    description: string;
    topic: string;
    title: string;
    createdAt: string;
    image: string;
    author: {
      username: string;
    };
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
        // Need to add click event to all nodes, clones included, otherwise would be like playing lottery.
        addClickHandler(duplicatedItem);
        addClickHandler(item);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const addClickHandler = (element: Element) => {
    element.addEventListener("click", () => {
      const id = element.getAttribute("data-id");
      if (id) {
        navigate(`post/${id}`);
      }
    });
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative  max-w-7xl overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <div
            data-id={item._id}
            className="cursor-pointer  z-40 w-[350px] max-w-full relative rounded-2xl border flex-shrink-0 px-8 py-6 md:w-[450px] transition-transform  hover:-translate-y-2"
            key={item._id}
          >
            <div className="flex flex-row justify-between items-start">
              <p className="font-semibold">{item.title}</p>
              <img
                src={item.image}
                alt=""
                className="md:h-16 md:w-16 h-12 w-12 object-center object-cover rounded-2xl"
              />
            </div>
            <blockquote>{item.description}</blockquote>
            <div className="relative z-20 mt-6 flex flex-row items-center">
              <span className="flex flex-col gap-1 w-full">
                <p className=" text-muted-foreground">{item.topic}</p>
                <span className="flex flex-row justify-between items-center w-full ">
                  <span className="self-end">
                    <p className="mt-0 text-muted-foreground ">
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </span>
                </span>
              </span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
