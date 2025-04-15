import { Link, useParams } from 'react-router-dom';
import DreamChaserSvg from '../../../../public/svg/DreamChaserSvg.svg';
import RiskTakerSvg from '../../../../public/svg/RiskTakerSvg.svg';
import SteadySailerSvg from '../../../../public/svg/SteadySailerSvg.svg';
import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
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
    description: `You're driven by your goals and aspirations. You work steadily to make your dreams a reality, motivated by a clear vision of what you want to achieve.`,
    file: DreamChaserSvg,
  },
  'soul': {
    title: "Growth Seeker",
    description: `You value personal growth and self-discovery. You see change as an opportunity to learn about yourself and enjoy exploring different perspectives.`,
    file: RiskTakerSvg,
  },
  'adventure': {
    title: "Voyager",
    description: `You're naturally curious and love exploring new ideas and experiences. You're drawn to discovery and aren't afraid to step outside your comfort zone.`,
    file: SteadySailerSvg,
  },
};

export const Results = () => {
  const { category } = useParams<{ category: string }>();
  const [percentage, setPercentage] = useState<number | null>(null);
  
  // Viewport height fix for ios devices 
  useLayoutEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    updateHeight();
    
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

    
  useEffect(() => {
    const getResults = async () => {
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('results')
          .select('category, count');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          setPercentage(null);
          return;
        }

        const totalCount = categoriesData.reduce((total, categoryData) => total + categoryData.count, 0);
        const categoryCount = categoriesData.find(categoryData => categoryData.category === category)?.count || 0;
        const categoryPercentage = (categoryCount / totalCount) * 100;

        setPercentage(categoryPercentage);
      } catch (e) {
        console.error('Unexpected error:', e);
        setPercentage(null);
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

  return (
    <div className='px-4 w-screen flex flex-col justify-center items-center text-center space-y-2'  style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className="border-r h-[40px] md:h-[50px] border-white"></div>
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
        className="max-w-[130px] md:max-w-[400px] lg:max-w-[500px]"
      />

      {percentage !== null ? (
        <p className='text-sm pt-5 '>{percentage.toFixed(1)}% of users got the result {title}</p>
      ) : (
          null
      )}
      
      <p className='max-w-md text-xs italic m-0 pt-5'> "And, when you want something, all the universe conspires in helping you to achieve it"</p>
      <Link to={`/`} className='border-white/10 border mt-6 px-8 py-2 bg-gradient-to-r from-[#3771be4b] to-[#4d85ff50] rounded-full text-white hover:scale-105 transition-all duration-300 flex items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Return Home
      </Link>
    </div>
  );
}
