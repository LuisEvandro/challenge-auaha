import { createContext, ReactNode, useState } from "react";
import { User } from "../lib/interfaces";

type AuthContextType = {
    user: User | undefined;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    // const tableUsers = firebase.database().ref('users')
    //         tableUsers.push({})

    return (
        <AuthContext.Provider value={{
            user
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}