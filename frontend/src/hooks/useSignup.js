import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { BASE_URL } from "../components/helper";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/user/signup`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json();
        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json));

            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }
    return {signup, isLoading, error};

}
