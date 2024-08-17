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

const categoryData: CategoryData = {
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);

      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('results')
          .select('category, count');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          setPercentage(null); // No data available
          return;
        }

        const totalCount = categoriesData.reduce((total, categoryData) => total + categoryData.count, 0);
        const categoryCount = categoriesData.find(categoryData => categoryData.category === category)?.count || 0;
        const categoryPercentage = (categoryCount / totalCount) * 100;

        setPercentage(categoryPercentage);
      } catch (e) {
        console.error('Unexpected error:', e);
        setPercentage(null); // No data available
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return <div className='flex h-screen w-screen items-center justify-center animate-spin'>
      <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* SVG path omitted for brevity */}
      </svg>
    </div>;
  }

  return (
    <div className='p-5 h-screen w-screen flex flex-col justify-center items-center text-center space-y-8'>
      <div className="border-r h-[70px] md:h-[120px] border-white my-4"></div>
      <h2>you're a</h2>

      <motion.h1
        className="result-main-txt mb-6 font-bold text-gradient-result text-transparent bg-clip-text"
      >
        {title}
      </motion.h1>

      <p className='max-w-xl text-sm md:text-md pt-5'>{description}</p>
      <motion.img 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: ["0%", "5%", "0%"] }}
        transition={{
          opacity: { duration: 3, ease: "easeOut" },
          y: { duration: 3, ease: "easeInOut", repeat: Infinity }
        }}
        src={file} alt={title} 
      />

      {percentage !== null ? (
        <p className='text-sm pt-5 '>{percentage.toFixed(1)}% of users got the result {title}</p>
      ) : (
           null
      )}
      
      <p className='max-w-md text-xs italic m-0 pt-5'> "And, when you want something, all the universe conspires in helping you to achieve it"</p>
    </div>
  );
}
