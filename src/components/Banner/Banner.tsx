
import { motion } from "framer-motion";

export const Banner = ({begin}) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen text-center h-screen">
        {/* <h1 className="max-w-md text-transparent bg-clip-text bg-gradient-to-b from-white to-[#FFFFFF9A]  animate-gradient mb-6">
            unveil your character</h1> */}
        
            <h1
  className="max-w-md  mb-6 font-bold bg-gradient-to-r from-white via-[#ffffffee] to-[#FFFFFF9A] text-transparent bg-clip-text animate-gradient"
>
  unveil your character
</h1>
        <button onClick={begin}>begin</button>
        
        <p>lorem ipsum dolor</p>
    </div>
  )
}

