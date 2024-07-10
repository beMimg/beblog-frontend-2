import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DURATION = 0.25;
const STAGGER = 0.025;

// children.split(/(?!$)/u) splits the string by each character, including spaces, and preserves them during rendering. The conditional l === " " ? "\u00A0" : l ensures that spaces are rendered as non-breaking spaces, preventing them from collapsing in the layout. This way, "SEE POSTS" will appear correctly with the space preserved
const FlipLink = ({ children, href }: { children: any; href: string }) => {
  const navigation = useNavigate();

  function handleClick() {
    navigation(`${href}`, { replace: true });
  }

  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-3xl uppercase md:text-4xl "
      onClick={handleClick}
    >
      <div>
        {children.split(/(?!$)/u).map((l: any, i: any) => {
          return (
            <motion.span
              // Why i+1 conditional rendering style? If the Icon is font-medium > it will have by default a blue background.
              // The ArrowUpRight will be always the last character of the string so, font-normal.
              className={`inline-block ${
                i + 1 === children.length ? "" : "font-bold"
              } `}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split(/(?!$)/u).map((l: any, i: any) => {
          return (
            <motion.span
              className={`inline-block ${
                i + 1 === children.length ? "" : "font-bold"
              } `}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.button>
  );
};

export default FlipLink;
