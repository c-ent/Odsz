import { useParams } from 'react-router-dom';
import DreamChaserSvg from '../../../../public/svg/DreamChaserSvg.svg';
import RiskTakerSvg from '../../../../public/svg/RiskTakerSvg.svg';
import SteadySailerSvg from '../../../../public/svg/SteadySailerSvg.svg';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'REMOVED'
const supabaseKey = `REMOVED`
const supabase = createClient(supabaseUrl, supabaseKey)

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
    title: "Voyager",
    description: `You fearlessly delve into the uncharted territories of life, seeking wisdom amidst the mysteries of the unknown. Every step you take is infused with curiosity and a thirst for knowledge, for you understand that true enlightenment lies in the depths of exploration.`,
    file: SteadySailerSvg,
  },
};


export const Results = () => {
  const { category } = useParams<{ category: string }>();
  const [percentage, setPercentage] = useState<number | null>(null);

  useEffect(() => {
    const getResults = async () => {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('results')
        .select('category, count');

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        return;
      }

      const totalCount = categoriesData.reduce((total, categoryData) => total + categoryData.count, 0);
      const categoryCount = categoriesData.find(categoryData => categoryData.category === category)?.count || 0;
      const categoryPercentage = (categoryCount / totalCount) * 100;

      setPercentage(categoryPercentage);
    };

    getResults();
  }, [category]);


  if (!category) {
    return <div>Oops</div>;
  }

  const categoryInfo = categoryData[category];


  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  const { title, description, file } = categoryInfo;

  
  if (percentage === null) {
    return <div className='flex h-screen w-screen items-center justify-center animate-spin'>
           <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_136_2)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7834 0.706872C18.2423 0.882372 17.9303 1.19437 17.7792 1.70381C17.6938 1.989 17.6792 2.652 17.6792 6.11325C17.6792 10.6982 17.6743 10.6397 18.1423 11.1077C18.7688 11.7317 20.2313 11.7317 20.8577 11.1077C21.3257 10.6397 21.3208 10.6982 21.3208 6.11325C21.3208 1.677 21.3135 1.599 20.9528 1.17C20.6505 0.811684 20.3263 0.692247 19.5975 0.672747C19.2392 0.662997 18.8736 0.677622 18.7834 0.706872ZM6.71047 5.52337C6.32534 5.69887 5.75741 6.25462 5.55997 6.6495C5.35522 7.06143 5.34547 7.51968 5.53072 7.92918C5.71109 8.33137 11.3758 14.0156 11.8219 14.2423C12.4532 14.5665 13.1016 14.4081 13.7548 13.7694C14.3983 13.1406 14.569 12.4581 14.2423 11.8219C14.0157 11.3758 8.33141 5.71106 7.92922 5.53069C7.55872 5.3625 7.07122 5.36006 6.71047 5.52337ZM31.3292 5.56237C31.0294 5.70131 30.5175 6.1815 28.0752 8.63118C25.8302 10.881 25.1453 11.6074 25.0356 11.8462C24.8503 12.2484 24.8528 12.714 25.038 13.1089C25.2087 13.4745 25.7693 14.0497 26.1471 14.2472C26.5298 14.4471 27.0977 14.4446 27.495 14.2423C27.9021 14.0327 33.5327 8.40206 33.7423 7.995C33.9447 7.60012 33.9471 7.02975 33.7497 6.65194C33.5498 6.26925 33.033 5.76225 32.643 5.56481C32.2067 5.343 31.8045 5.343 31.3292 5.56237ZM1.70384 17.7742C0.984781 18.0009 0.628906 18.5737 0.628906 19.4976C0.631344 20.4409 0.982344 21.0064 1.70141 21.2209C1.98903 21.3062 2.63009 21.3208 6.11328 21.3208C9.74272 21.3208 10.2278 21.3086 10.5252 21.2111C10.9639 21.0697 11.3198 20.7139 11.4612 20.2751C11.6708 19.6292 11.566 18.7127 11.232 18.2593C11.1589 18.1618 10.9493 17.9985 10.7665 17.8986L10.4325 17.7133L6.20834 17.6987C2.80803 17.6889 1.92809 17.7036 1.70384 17.7742ZM28.6285 17.7401C28.3287 17.8132 27.9143 18.0643 27.768 18.2617C27.4341 18.7127 27.3293 19.6292 27.5389 20.2751C27.6803 20.7139 28.0362 21.0697 28.4749 21.2111C28.7723 21.3086 29.2573 21.3208 32.8868 21.3208C36.37 21.3208 37.011 21.3062 37.2987 21.2209C38.0177 21.0064 38.3687 20.4409 38.3712 19.4976C38.3712 18.5591 38.0128 17.9961 37.2694 17.7718C37.0183 17.6962 36.231 17.6816 32.8965 17.6865C30.6589 17.6914 28.7382 17.7157 28.6285 17.7401ZM11.8292 25.0624C11.5294 25.2013 11.0175 25.6815 8.57516 28.1312C6.33022 30.381 5.64528 31.1074 5.53559 31.3462C5.35034 31.7484 5.35278 32.214 5.53803 32.6089C5.70866 32.9745 6.26928 33.5498 6.64709 33.7472C7.02978 33.9471 7.59772 33.9446 7.99503 33.7423C8.40209 33.5327 14.0327 27.9021 14.2423 27.495C14.4447 27.1001 14.4471 26.5297 14.2497 26.1519C14.0498 25.7692 13.533 25.2622 13.143 25.0648C12.7067 24.843 12.3045 24.843 11.8292 25.0624ZM26.2105 25.0234C25.8253 25.1989 25.2574 25.7546 25.06 26.1495C24.8552 26.5614 24.8455 27.0197 25.0307 27.4292C25.2111 27.8314 30.8758 33.5156 31.3219 33.7423C31.9532 34.0665 32.6016 33.9081 33.2548 33.2694C33.8983 32.6406 34.069 31.9581 33.7423 31.3219C33.5157 30.8758 27.8314 25.2111 27.4292 25.0307C27.0587 24.8625 26.5712 24.8601 26.2105 25.0234ZM18.8785 27.4877C18.5738 27.5657 18.1618 27.8167 18.018 28.0117C17.6817 28.4651 17.6792 28.4968 17.6792 32.8794C17.6792 36.3699 17.6938 37.011 17.7792 37.2986C17.9937 38.0177 18.5616 38.3687 19.5 38.3687C20.4385 38.3687 21.0064 38.0177 21.2209 37.2986C21.372 36.7819 21.3696 28.9453 21.216 28.4944C21.0698 28.0654 20.9016 27.8606 20.5238 27.6559C20.2557 27.5096 20.0997 27.4731 19.639 27.456C19.3294 27.4438 18.9882 27.4584 18.8785 27.4877Z" fill="#FFEFD8"/>
</g>
<defs>
<clipPath id="clip0_136_2">
<rect width="39" height="39" fill="white"/>
</clipPath>
</defs>
</svg>



            </div>;
  }

  
  return (
    <div className='p-5 h-screen w-screen flex flex-col justify-center items-center text-center space-y-8'>


      <div className="border-r h-[70px] md:h-[120px] border-white my-4"></div>
      <h2>you're a</h2>
      {/* <h1 className='font-bold'></h1> */}

      <motion.h1
    // className="max-w-lg mb-6 font-bold bg-gradient-to-b from-white via-[#b9b9b9c5] to-white text-transparent bg-clip-text"
    className="result-main-txt mb-6 font-bold text-gradient-result text-transparent bg-clip-text"
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1, y: ["0%", "1%", "0%"] }}
    // transition={{
    //   opacity: { duration: 3, ease: "easeOut" },
    //   y: { duration: 2, ease: "easeInOut", repeat: Infinity }
    // }}
  >
   {title}
  </motion.h1>
 
      <p className='max-w-xl text-sm md:text-md pt-5 '>{description}</p>
      <motion.img 
       initial={{ opacity: 0 }}
    animate={{ opacity: 1, y: ["0%", "5%", "0%"] }}
    transition={{
      opacity: { duration: 3, ease: "easeOut" },
      y: { duration: 3, ease: "easeInOut", repeat: Infinity }
    }}
      src={file} alt={title} 
      />

    {/* <p className='text-sm pt-5 '>
        {percentage.toFixed(1)}% of users got the result {title}
        
    </p> */}

 {percentage !== null && <p className='text-sm pt-5 '>{percentage.toFixed(1)}% of users got the result {title}</p>}
      <p className='max-w-md text-xs italic m-0 pt-5  '> "And, when you want something, all the universe conspires in helping you to achieve it"</p>
      
    
    </div>
  );
}