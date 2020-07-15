import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useAuth } from './AuthContext/authContex';

function PrivateRouter ({ component: Component, ...rest })
{
    const { authTokens } = useAuth();
    return (
        <Route { ...rest } render={ (props) =>
            authTokens ? (
                <Component { ...props } />
            ) : (
                    <Redirect to="/login/" />
                ) } />
    );
}

export default PrivateRouter;