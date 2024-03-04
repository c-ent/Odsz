
import { motion } from "framer-motion";

type beginprops = {
  begin: () => void; // replace with the actual function signature if it's not a void function
};

export const Banner = ({begin}: beginprops) => {
  return (
<div className="flex flex-col h-[90vh] items-center text-center">
  <div className="mt-auto flex flex-col items-center justify-end">
    <motion.h1
    // className="max-w-lg mb-6 font-bold bg-gradient-to-b from-white via-[#b9b9b9c5] to-white text-transparent bg-clip-text"
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

  <div className="mt-auto flex flex-col items-center mb-4">
    <div className="border-r  h-[60px] border-white my-4"></div>
    <p className="italic font-extralight p-5 md:p-0 md:max-w-[600px]">
    to realize ones destiny is a persons only obligation
    </p>
    
  </div>
</div>
  )
}

