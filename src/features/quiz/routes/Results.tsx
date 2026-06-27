import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ErrorState } from '@/components/ErrorState';
import { CATEGORIES, isCategory } from '@/lib/categories';
import { getCategoryPercentage } from '@/lib/results';

export const Results = () => {
  const { category } = useParams<{ category: string }>();
  const [percentage, setPercentage] = useState<number | null>(null);
  const [statsError, setStatsError] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    if (!isCategory(category)) return;

    const loadStats = async () => {
      setIsLoadingStats(true);
      setStatsError(false);

      const { percentage: result, error } = await getCategoryPercentage(category);

      if (error) {
        setStatsError(true);
        setPercentage(null);
      } else {
        setPercentage(result);
      }

      setIsLoadingStats(false);
    };

    loadStats();
  }, [category]);

  if (!category) {
    return (
      <div
        className="px-4 w-screen h-dvh flex flex-col justify-center items-center"
      >
        <ErrorState message="Something went wrong." />
      </div>
    );
  }

  if (!isCategory(category)) {
    return (
      <div
        className="px-4 w-screen h-dvh flex flex-col justify-center items-center"
      >
        <ErrorState message="Category not found." />
        <Link
          to="/"
          className="border-white/10 border mt-6 px-8 py-2 bg-linear-to-r from-[#3771be4b] to-[#4d85ff50] rounded-full text-white hover:scale-105 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const { title, description, svg } = CATEGORIES[category];

  return (
    <div
      className="px-4 w-screen h-dvh flex flex-col justify-center items-center text-center space-y-2"
    >
      <div className="border-r h-[40px] md:h-[50px] border-white" />
      <h2>you're a</h2>

      <motion.h1 className="result-main-txt mb-6 font-bold text-gradient-main">
        {title}
      </motion.h1>

      <p className="max-w-xl text-sm md:text-md pt-5">{description}</p>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: ['0%', '5%', '0%'] }}
        transition={{
          opacity: { duration: 3, ease: 'easeOut' },
          y: { duration: 3, ease: 'easeInOut', repeat: Infinity },
        }}
        src={svg}
        alt={title}
        className="max-w-[130px] md:max-w-[400px] lg:max-w-[500px]"
      />

      <p className="text-sm pt-5">
        {isLoadingStats && <span className="inline-block animate-pulse">Loading stats…</span>}
        {!isLoadingStats && statsError && (
          <span className="text-white/70">Unable to load stats right now.</span>
        )}
        {!isLoadingStats && !statsError && percentage !== null && (
          <span>{percentage.toFixed(1)}% of users got the result {title}</span>
        )}
      </p>

      <p className="max-w-md text-xs italic m-0 pt-5">
        "And, when you want something, all the universe conspires in helping you to achieve it"
      </p>
      <Link
        to="/"
        className="border-white/10 border mt-6 px-8 py-2 bg-linear-to-r from-[#3771be4b] to-[#4d85ff50] rounded-full text-white hover:scale-105 transition-all duration-300 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Return Home
      </Link>
    </div>
  );
};
