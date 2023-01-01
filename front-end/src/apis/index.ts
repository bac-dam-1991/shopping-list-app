import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown) => {
  return (
    ((error as AxiosError).response?.data as string) || (error as Error).message
  );
};
