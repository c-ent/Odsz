import type { ReactNode } from 'react';
import { motion, type MotionProps } from 'framer-motion';

const glassCardClassName =
  'p-6 md:p-8 shadow-sm shadow-white text-center flex flex-col items-center bg-linear-to-br from-[#fdfdfd00] to-[#ffffff05] rounded-2xl h-full backdrop-blur-[5px]';

type QuizCardProps = {
  children: ReactNode;
  className?: string;
  motionProps?: MotionProps;
};

export const QuizCard = ({ children, className = '', motionProps }: QuizCardProps) => {
  const classNames = `${glassCardClassName} ${className}`.trim();

  if (motionProps) {
    return (
      <motion.div className={classNames} {...motionProps}>
        {children}
      </motion.div>
    );
  }

  return <div className={classNames}>{children}</div>;
};
