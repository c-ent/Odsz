type LogContext = Record<string, unknown>;

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const logger = {
  error(message: string, options?: { error?: unknown; context?: LogContext }) {
    if (!import.meta.env.DEV) return;

    const details: LogContext = {
      ...options?.context,
    };

    if (options?.error !== undefined) {
      details.error = toErrorMessage(options.error);
    }

    console.error(`[ods] ${message}`, details);
  },
};
