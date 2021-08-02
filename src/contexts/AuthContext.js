import { createContext,useContext,useEffect,useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext({

})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState();

    const signup = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }

    const logout = () => auth.signOut()

    const resetPassword = (email) => auth.sendPasswordResetEmail(email)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user));

        return unsubscribe;
    }, [])

    

    const ctx = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    }

    return(
        <AuthContext.Provider value={ctx}>
            {children}
        </AuthContext.Provider>
    )
}