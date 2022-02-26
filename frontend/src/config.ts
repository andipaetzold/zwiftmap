export const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;
export const GIT_SHA = import.meta.env.VITE_GIT_SHA as string;
export const ENVIRONMENT = import.meta.env.NODE_ENV as
  | "development"
  | "production";
