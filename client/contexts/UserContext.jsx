import { createContext,use,useState } from "react";

export const UserContext= createContext();

export function UserProvider({children}){

    const [userId,setUserId]=useState("");
    const [userEmail,setUserEmail]=useState("");

    const userEmailSetter=(email)=>{
        setUserEmail(email);
    }
    const userIdSetter=(id)=>{
        setUserId(id);
    }

    return (
        <UserContext.Provider value={{userId,userEmail,userEmailSetter,userIdSetter}}>
            {children}
        </UserContext.Provider>
    )
}