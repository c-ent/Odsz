import { Turnstile } from '@marsidev/react-turnstile';
import { motion } from 'framer-motion';
import { ErrorState } from '@/components/ErrorState';
import { QuizCard } from './QuizCard';

type LoadingStateProps = {
  isSubmitting: boolean;
  submitError: string | null;
  captchaKey: number;
  onRetry: () => void;
  onCaptchaSuccess: (token: string) => void;
};

export const LoadingState = ({
  isSubmitting,
  submitError,
  captchaKey,
  onRetry,
  onCaptchaSuccess,
}: LoadingStateProps) => {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  if (submitError) {
    return (
      <QuizCard className="justify-center gap-8">
        <ErrorState
          message={submitError}
          action={{ label: 'Try again', onClick: onRetry }}
        />
      </QuizCard>
    );
  }

  return (
    <QuizCard
      className="justify-center gap-8"
      motionProps={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4 },
      }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/5 blur-xl" />
        <motion.img
          src="/svg/hourglass.svg"
          alt=""
          aria-hidden="true"
          className="relative w-14 h-14 md:w-16 md:h-16"
          animate={{ rotate: [0, 0, 180, 180, 360] }}
          transition={{
            duration: 2.8,
            ease: 'easeInOut',
            repeat: Infinity,
            times: [0, 0.38, 0.5, 0.88, 1],
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.p
          className="text-gradient-main text-xl md:text-2xl tracking-wide"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {isSubmitting ? 'Calculating your results' : 'Verifying you’re human'}
        </motion.p>

        {!isSubmitting && siteKey && (
          <Turnstile
            key={captchaKey}
            siteKey={siteKey}
            onSuccess={onCaptchaSuccess}
            options={{ theme: 'dark', size: 'normal' }}
          />
        )}

        {!isSubmitting && !siteKey && (
          <p className="text-sm text-white/70">Turnstile site key is not configured.</p>
        )}

        <div className="flex gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/80"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </QuizCard>
  );
};
