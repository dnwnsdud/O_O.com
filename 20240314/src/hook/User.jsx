import React, { createContext, useState } from 'react';
import moment from "moment";
moment.locale("ko");

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    let [day, setDay] = useState(moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).format("YYYY-MM-DD"));
    const [user, setUser] = useState("logout");//[{},()=>{}



    return (
        <UserContext.Provider value={{
            user, setUser, day, setDay
        }}>
            {children}
        </UserContext.Provider >
    )
}
export const useUserContext = () => { return React.useContext(UserContext) };