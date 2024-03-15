import type { AxiosError } from "axios";

export type Error = {
  message: string;
  statusCode: number;
};

export type ExtAxiosError = AxiosError<Error>;
