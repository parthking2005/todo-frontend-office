import { createContext, useContext } from "react";

export const loginContext = createContext({
    notLogin: () => {},
    logined: () => {},
    loginState: () => {}
}) 

export const LoginProvider = loginContext.Provider

export function useLogin(){
    return useContext(loginContext)
}