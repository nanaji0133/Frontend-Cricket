import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../AuthContext/authContex';

const Login = () =>
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setTokens } = useAuth();

    const postLogin = (e) =>
    {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/rest-auth/login/", { username, password })
            .then(res =>
            {
                setTokens(res.data);
                setIsLoggedIn(true);
                console.log(res, res.data);
            })
            .then(err => console.log(err));
    };

    if (isLoggedIn)
    {
        return <Redirect to="/admin/" />;
    }

    return (
        <div id="auth">
            <form onSubmit={ postLogin }>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">user name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User name"
                        name="username" value={ username }
                        onChange={ e => setUsername(e.target.value) } />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        name="password" value={ password }
                        onChange={ e => setPassword(e.target.value) } />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;