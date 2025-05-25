export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.flashpoint.twilightparadox.com"
    : "http://localhost:3002";
