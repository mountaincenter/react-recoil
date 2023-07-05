import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const options = {
  ignoreHeaders: true,
};
export const client = applyCaseMiddleware(
  axios.create({
    baseURL:
      import.meta.env.MODE === "development"
        ? "http://localhost"
        : "https://api.ymnk.fun"
    }),
  options
);