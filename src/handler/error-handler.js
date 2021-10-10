import { errorMessage } from "../constant/errors";

export const errorHandler = (errorType) => {
  if (errorMessage[errorType])
    console.error("\x1b[31m%s\x1b[0m", errorMessage[errorType]);

  return;
};
