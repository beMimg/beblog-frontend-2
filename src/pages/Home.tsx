import FlipLink from "../components/ui/fliplink";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { LinkPreview } from "../components/ui/link-preview";
import personalWebsitePng from "../assets/personal-website.png";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { accessToken } = useAuth();

  console.log(accessToken);
  return (
    <div className="flex flex-1 flex-col justify-center gap-8 items-center">
      <h1 className="text-center">
        Welcome to{" "}
        <LinkPreview
          className="underline"
          url="https://www.bemimg.com"
          imageSrc={personalWebsitePng}
        >
          beMimg's
        </LinkPreview>{" "}
        Code Circus
      </h1>
      <p className=" p-lead text-center ">
        Where my logic is as lost as an alien in a shopping mall, and my blogs?
        They’re out of this world!
      </p>
      <FlipLink href="/posts">SEE POSTS ↗</FlipLink>
      <div className=" overflow-hidden w-full flex items-center justify-center">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </div>
    </div>
  );
};

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export default Home;
