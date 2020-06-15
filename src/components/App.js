import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../index.css";
import "../style.css";
import Footer from "./Footer";
import Header from "./Header";
import TeamCreate from "./TeamCreate";
import TeamDetail from "./TeamDetail";
import TeamList from "./TeamList";

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
                    </Switch>
                    <Footer />
                </Router>

            </div>
        );
    }
}

export default App;