type ErrorStateProps = {
  message: string;
  action?: { label: string; onClick: () => void };
};

export const ErrorState = ({ message, action }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 px-4">
      <p className="text-gradient-main text-xl">{message}</p>
      {action && (
        <button type="button" onClick={action.onClick} className="btn-secondary">
          {action.label}
        </button>
      )}
    </div>
  );
};
