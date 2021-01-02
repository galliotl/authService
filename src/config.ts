export const dbUrl = `mongodb://${
  process.env.LOCALHOST || "localhost"
}:27017/auth`;
export const BASE_URL = "http://localhost:3000";
export const jwtSecretKey = "secret";
