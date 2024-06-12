import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo,setUserInfo] = useState();
    
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/profile`,{credentials:'include'})
        .then(response => response.json())
        .then(data => setUserInfo(data.userInfo))

    },[])

    return(
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}