import { useState, createContext, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase";


//actual value you want to access
export const User = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser}

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user)
            setCurrentUser(user)
            if(user){
                createUserDocumentFromAuth(user);
            }    
        })
        return unsubscribe;
    }, [])

    return <User.Provider value={value}>{children}</User.Provider>
}