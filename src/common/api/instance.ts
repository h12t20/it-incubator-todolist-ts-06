import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: { "API-KEY": "c4e2e779-7576-4ba3-8689-ca30206134b3" },
});
