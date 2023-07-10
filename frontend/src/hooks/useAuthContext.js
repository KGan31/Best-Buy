import { AuthContext } from "../context/authContext";

import React, { useContext } from 'react'

function useAuthContext() {
    const context = useContext(AuthContext);
    if(!context){
        throw Error('useAuthContext must be used inside AuthContext')
    }
    return context;
}

export default useAuthContext
