import React, {FC, memo, useMemo, useState} from "react";
import {Props as AuthStateProps, AuthContext} from './AuthContext';



interface Props {
    children: React.ReactNode
}

export const AuthProvider: FC<Props> = memo(({children}) => {

    const [isAuth, setIsAuth] = useState(false);
    console.log(isAuth)

    // const setAuth = () => {console.log('setAuth'); setIsAuth(true)};
 
    const value: AuthStateProps = useMemo(() => ({
        isAuth,
        setIsAuth
      }), [ isAuth]);
  
    
      
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
})