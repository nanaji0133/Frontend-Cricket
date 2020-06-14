import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import Team from "./Team";

class App extends Component
{
    render ()
    {
        return (
            <Router>
                <div className="container">
                    <Header />

                    <Switch>
                        <Route path="/" exact />
                        <Route path="/teams" component={ Team } />
                    </Switch>

                    <Footer />

                </div >
            </Router>

        );
    }
}

export default App;