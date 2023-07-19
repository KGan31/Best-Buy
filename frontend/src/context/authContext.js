import { useReducer, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode"
export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN': 
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            const {token} = user;
            const {exp} = jwt_decode(token)
            const expirationTimeInSeconds = exp * 1000
            const now = new Date()
            const isValid = expirationTimeInSeconds >= now.getTime()
            if(isValid){
                dispatch({type: 'LOGIN', payload: user})
            }
            else{
                localStorage.removeItem('user');
                dispatch({type: 'LOGOUT'})
            }
        }
    }, [])
    console.log('AuthContext State: ', state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}