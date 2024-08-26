import { QueryClient } from "@tanstack/react-query";

export const qc = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});