import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [x, setX] = useState(1);



    return (
        <UserContext.Provider value={{ x, setX }}>
            {children}
        </UserContext.Provider >
    )
}
export const useUserContext = () => { return React.useContext(UserContext) };