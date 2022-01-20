import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';


export const ProtectedRoutes: FC<any> = ({children}) => {

    const loggedUser = localStorage.getItem('soma_user') 

    if(loggedUser) return children
    else return <Navigate to="/login"/>;
}
