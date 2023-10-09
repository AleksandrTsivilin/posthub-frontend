import { createContext } from 'react';


export interface Props {
   isAuth: boolean,
   setIsAuth: (isAuth: boolean) => void
}

export const AuthContext = createContext<Props>({
        isAuth: false,
        setIsAuth: () => {}
    }
);