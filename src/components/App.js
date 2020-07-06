import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../index.css";
import "../style.css";
import Footer from "./Footer";
import Header from "./Header";
import PlayerCreate from "./Player/PlayerCreate";
import PlayerDetail from "./Player/PlayerDetail";
import PlayersList from "./Player/PlayersList";
import TeamCreate from "./Team/TeamCreate";
import TeamDetail from "./Team/TeamDetail";
import TeamList from "./Team/TeamList";

class App extends Component
{
    render ()
    {
        return (
            <div className="container">
                <Router >
                    <Header />
                    <Switch>
                        <Route exact path="/teams" component={ TeamList } />
                        <Route path="/teams/create" component={ TeamCreate } />
                        <Route path="/teams/:id" component={ TeamDetail } />
                        <Route exact path="/players" component={ PlayersList } />
                        <Route path="/players/create" component={ PlayerCreate } />
                        <Route path="/players/:id" component={ PlayerDetail } />
                    </Switch>
                    <Footer />
                </Router>

            </div>
        );
    }
}

export default App;