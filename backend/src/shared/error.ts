import axios from "axios";
import { ErrorWithStatusCode } from "./ErrorWithStatusCode";

export function handleError(e: unknown, defaultMessage: string) {
  if (axios.isAxiosError(e)) {
    throw new ErrorWithStatusCode(e.message, e.response?.status ?? 500);
  } else if (e instanceof Error) {
    throw new ErrorWithStatusCode(e.message, 500);
  } else {
    throw new ErrorWithStatusCode(defaultMessage, 500);
  }
}
