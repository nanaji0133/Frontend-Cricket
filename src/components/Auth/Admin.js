import React from 'react';
import { useAuth } from '../../AuthContext/authContex';

const Admin = () =>
{
    const { setTokens } = useAuth();

   function logout()
    {
        setTokens(null);
    };
    return (
        <div id="auth">
            Admin home page
            <button onClick={ logout } >Logout</button>
        </div>
    );
};

export default Admin;