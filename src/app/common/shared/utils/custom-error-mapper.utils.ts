export const customErrorMapper = (message) =>
  ({
    error: {
      error: {
        message: {
          text: message,
        },
      },
    },
  } as any);
