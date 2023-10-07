import { instance } from "./instance";

export const securityAPI = {
  captcha() {
    return instance.get<{ url: string }>(`security/get-captcha-url`);
  },
};
