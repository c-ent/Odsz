import { motion } from 'framer-motion';
import { useQuiz } from './hooks/useQuiz';
import { useSubmitResult } from './hooks/useSubmitResult';
import { Choice } from './components/Choice';
import { QuizCard } from './components/QuizCard';
import { LoadingState } from './components/LoadingState';

const GREEK_LABELS = ['α', 'β', 'γ'] as const;

export const Form = () => {
  const {
    questions,
    currentQuestionIndex,
    currentQuestion,
    selectedChoices,
    selectedChoice,
    isComplete,
    handleChoiceClick,
  } = useQuiz();

  const { isSubmitting, submitError, retry, submitWithToken, captchaKey } =
    useSubmitResult({
      isComplete,
      selectedChoices,
    });

  if (isComplete) {
    return (
      <LoadingState
        isSubmitting={isSubmitting}
        submitError={submitError}
        captchaKey={captchaKey}
        onRetry={retry}
        onCaptchaSuccess={submitWithToken}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <QuizCard className="justify-center">
        <p>No question available</p>
      </QuizCard>
    );
  }

  const topChoices = currentQuestion.choices.slice(0, 2);
  const bottomChoice = currentQuestion.choices[2];

  return (
    <QuizCard
      motionProps={{
        animate: { y: ['100%', '0%'] },
        transition: { y: { duration: 2, ease: 'easeInOut' } },
      }}
    >
      <div className="flex flex-col gap-6">
        <p>
          Question {currentQuestionIndex + 1} out of {questions.length}
        </p>
        <motion.h2
          key={`question-${currentQuestionIndex}`}
          className="max-w-5xl underline decoration-1 underline-offset-8"
          initial={{ opacity: 0, y: '10%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1, ease: 'easeOut' },
            y: { duration: 1, ease: 'easeOut' },
          }}
        >
          {currentQuestion.question}
        </motion.h2>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
          {topChoices.map((choice, index) => (
            <Choice
              key={choice.id}
              label={GREEK_LABELS[index]}
              text={choice.choice}
              questionIndex={currentQuestionIndex}
              choiceIndex={index}
              animationDelay={0.3 + index * 0.3}
              isVisible={selectedChoice === null || selectedChoice === choice.id}
              onSelect={() => handleChoiceClick(choice.id)}
            />
          ))}
        </div>

        {bottomChoice && (
          <div>
            <Choice
              label={GREEK_LABELS[2]}
              text={bottomChoice.choice}
              questionIndex={currentQuestionIndex}
              choiceIndex={2}
              animationDelay={0.9}
              isVisible={selectedChoice === null || selectedChoice === bottomChoice.id}
              onSelect={() => handleChoiceClick(bottomChoice.id)}
            />
          </div>
        )}
      </div>
    </QuizCard>
  );
};
