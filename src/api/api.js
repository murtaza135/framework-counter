import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://localhost:3004",
  credentials: 'include',
  throwHttpErrors: true,
});
