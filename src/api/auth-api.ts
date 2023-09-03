import {instance} from "./instance";
import {ResponseType} from "./todolist-api";
type AuthMeResponseType = {
    id: number,
    email:string,
    login:string,
}
export const authAPI = {
    login(loginParams:LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>(`/auth/login`, loginParams)
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
    me() {
        return instance.get<ResponseType<AuthMeResponseType>>(`/auth/me`)
    }
}
//types
export type LoginParamsType={
    email:string,
    password:string,
    rememberMe:boolean,
}