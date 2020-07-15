import React from 'react';
import { useAuth } from '../../AuthContext/authContex';

const Admin = () =>
{
    const { setAuthTokens } = useAuth();

   function logout()
    {
        setAuthTokens();
    };
    return (
        <div id="auth">
            Admin home page
            <button onClick={ logout } >Logout</button>
        </div>
    );
};

export default Admin;