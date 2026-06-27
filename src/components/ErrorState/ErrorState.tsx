type ErrorStateProps = {
  message: string;
  action?: { label: string; onClick: () => void };
};

export const ErrorState = ({ message, action }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 px-4">
      <p className="text-gradient-main text-xl">{message}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="border-white/10 border px-8 py-2 bg-linear-to-r from-[#3771be4b] to-[#4d85ff50] rounded-full text-white hover:scale-105 transition-all duration-300"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
