import ky from "ky";

export const client = ky.create({
  prefixUrl: "/",
  retry: {
    limit: 0, // Disable retries
  },
  timeout: false, // Disable timeout
});
