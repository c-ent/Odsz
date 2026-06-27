import { motion } from 'framer-motion';

type ChoiceProps = {
  label: string;
  text: string;
  questionIndex: number;
  choiceIndex: number;
  animationDelay: number;
  isVisible: boolean;
  onSelect: () => void;
};

export const Choice = ({
  label,
  text,
  questionIndex,
  choiceIndex,
  animationDelay,
  isVisible,
  onSelect,
}: ChoiceProps) => (
  <motion.button
    key={`choice-${questionIndex}-${choiceIndex}`}
    type="button"
    aria-label={text}
    aria-hidden={!isVisible}
    tabIndex={isVisible ? 0 : -1}
    disabled={!isVisible}
    className={`quiz-choice max-w-xl flex-1 gap-5 shrink-0 ${isVisible ? 'cursor-pointer' : 'pointer-events-none invisible'}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
    exit={{ opacity: 0 }}
    whileTap={isVisible ? { scale: 1.05 } : undefined}
    transition={{
      opacity: { duration: 0.8, ease: 'easeOut', delay: animationDelay },
      scale: { duration: 0.2 },
    }}
    onClick={onSelect}
  >
    <span className="text-4xl shrink-0 text-white" aria-hidden="true">
      {label}
    </span>
    <span className="min-w-0 flex-1">{text}</span>
  </motion.button>
);
