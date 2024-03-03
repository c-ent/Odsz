import { useParams } from 'react-router-dom';
import DreamChaserSvg from '../../../../public/svg/DreamChaserSvg.svg';
import RiskTakerSvg from '../../../../public/svg/RiskTakerSvg.svg';
import SteadySailerSvg from '../../../../public/svg/SteadySailerSvg.svg';
import { motion } from 'framer-motion';

type CategoryData = {
  [key: string]: {
    title: string;
    description: string;
    file: string;
  };
};

const categoryData:CategoryData = {
  'dream': {
    title: "Dream Chaser",
    description: `You pursue your deepest aspirations, driven by the vision of what you want to achieve in life. Whether it's a career goal, a creative endeavor, or a personal ambition, you relentlessly strive to turn your dreams into reality.`,
    file: DreamChaserSvg,
  },
  'soul': {
    title: "Soul Searcher",
    description: `You embrace change as the catalyst for growth and transformation on your quest to discover your personal legend. Through introspection and exploration, you unravel the layers of your being, unearthing the true essence of your existence.`,
    file: RiskTakerSvg,
  },
  'adventure': {
    title: "Adventurer",
    description: `You fearlessly delve into the uncharted territories of life, seeking wisdom amidst the mysteries of the unknown. Every step you take is infused with curiosity and a thirst for knowledge, for you understand that true enlightenment lies in the depths of exploration.`,
    file: SteadySailerSvg,
  },
};


export const Results = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category) {
    return <div>Oops</div>;
  }

  const categoryInfo = categoryData[category];


  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  const { title, description, file } = categoryInfo;

  return (
    <div className='p-5 h-screen w-screen flex flex-col justify-center items-center text-center space-y-5'>


      <div className="border-r h-[100px] md:h-[120px] border-white my-4"></div>
      <h2>you are</h2>
      {/* <h1 className='font-bold'></h1> */}

      <motion.h1
    // className="max-w-lg mb-6 font-bold bg-gradient-to-b from-white via-[#b9b9b9c5] to-white text-transparent bg-clip-text"
    className="result-main-txt max-w-lg mb-6 font-bold text-gradient-result text-transparent bg-clip-text"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y: ["0%", "5%", "0%"] }}
    transition={{
      opacity: { duration: 3, ease: "easeOut" },
      y: { duration: 5, ease: "easeInOut", repeat: Infinity }
    }}
  >
   {title}
  </motion.h1>

      <p className='max-w-xl text-sm md:text-md'>{description}</p>
      <img src={file} alt={title} />
      <p className='max-w-md text-xs'> And, when you want something, all the universe conspires in helping you to achieve it.</p>
    </div>
  );
}