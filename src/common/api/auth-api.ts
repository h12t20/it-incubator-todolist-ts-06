import { instance } from "./instance";
import { BaseResponse } from "../types/types";

type AuthMeResponseType = {
  id: number;
  email: string;
  login: string;
};
export const authAPI = {
  login(loginParams: LoginParamsType) {
    return instance.post<BaseResponse<{ userId?: number }>>(`auth/login`, loginParams);
  },
  logout() {
    return instance.delete<BaseResponse>(`auth/login`);
  },
  me() {
    return instance.get<BaseResponse<AuthMeResponseType>>(`auth/me`);
  },
  captcha() {
    return instance.get<{ url: string }>(`security/get-captcha-url`);
  },
};
//types
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
