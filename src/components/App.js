import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "../AuthContext/authContex";
import "../index.css";
import PrivateRouter from "../PrivateRouter";
import "../style.css";
import Admin from "./Auth/Admin";
import Login from "./Auth/Login";
import Singin from "./Auth/Signin";
import Footer from "./Footer";
import Header from "./Header";
import PlayerCreate from "./Player/PlayerCreate";
import PlayerDetail from "./Player/PlayerDetail";
import PlayersList from "./Player/PlayersList";
import TeamCreate from "./Team/TeamCreate";
import TeamDetail from "./Team/TeamDetail";
import TeamList from "./Team/TeamList";

const App = () =>
{
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) =>
    {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    };

    return (
        <div className="container">
            <AuthContext.Provider value={ { authTokens,  setTokens } }>
                <Router >
                    <Header />
                    <Switch>
                        <Route exact path="/teams" component={ TeamList } />
                        <Route path="/teams/create" component={ TeamCreate } />
                        <Route path="/teams/:id" component={ TeamDetail } />
                        <Route exact path="/players" component={ PlayersList } />
                        <PrivateRouter path="/players/create" component={ PlayerCreate } />
                        <PrivateRouter path="/players/:id" component={ PlayerDetail } />
                        <Route path="/signin" component={ Singin } />
                        <Route path="/login" component={ Login } />
                        <PrivateRouter path="/admin" component={ Admin } />
                    </Switch>
                    <Footer />
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
