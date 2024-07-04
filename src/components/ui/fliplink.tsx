import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: any; href: string }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-3xl uppercase md:text-4xl "
      href={href}
    >
      <div>
        {children.split("").map((l: any, i: any) => {
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
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l: any, i: any) => {
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
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.a>
  );
};

export default FlipLink;
