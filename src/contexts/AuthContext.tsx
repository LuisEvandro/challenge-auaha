import { createContext, ReactNode, useState } from "react";
// import { auth, firebase } from "../lib/firebase";
import { User } from "../lib/interfaces";

type AuthContextType = {
    user: User | undefined;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    return (
        <AuthContext.Provider value={{
            user 
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}