
import { motion } from "framer-motion";

export const Banner = ({begin}) => {
  return (
      <div className="flex flex-col items-center justify-center w-screen text-center h-screen relative">
<section>
        <span></span>
        <span></span>

    </section>
      
        <h1
          className="max-w-lg  mb-6 font-bold bg-gradient-to-b from-white via-[#b9b9b9c5] to-white text-transparent bg-clip-text animate-text"
        >
          unveil your character
        </h1>

        
        
        <button onClick={begin}>
          begin
        </button>

        
        <p className="max-w-[200px] absolute justify-center bottom-10 flex flex-col items-center">
          <div class="border-r h-[120px] border-white my-4"></div>
          to realize ones destiny is a persons only obligation
        </p>
      </div>
  )
}

