import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState("logout");//[{},()=>{}



    return (
        <UserContext.Provider value={{
            user, setUser
        }}>
            {children}
        </UserContext.Provider >
    )
}
export const useUserContext = () => { return React.useContext(UserContext) };