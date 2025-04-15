import { motion } from "framer-motion";

type beginprops = {
  begin: () => void;
};

export const Banner = ({begin}: beginprops) => {
  return (
    <div className="flex flex-col justify-between items-center h-[80vh] w-full">
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            className="max-w-lg mb-6 font-bold text-gradient-main text-transparent bg-clip-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: ["0%", "5%", "0%"] }}
            transition={{
              opacity: { duration: 3, ease: "easeOut" },
              y: { duration: 5, ease: "easeInOut", repeat: Infinity }
            }}
          >
            unveil your character
          </motion.h1>
          <button onClick={begin}>
            begin
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <div className="border-r h-[60px] border-white my-4"></div>
        <p className="italic text-center font-extralight p-5 md:p-0 md:max-w-[600px]">
          to realize ones destiny is a persons only obligation
        </p>
      </div>
    </div>
  )
}