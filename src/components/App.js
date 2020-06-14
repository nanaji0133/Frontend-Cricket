import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import TeamDetailView from "./TeamDetailView";
import TeamListView from "./TeamListView";

class App extends Component
{
    render ()
    {
        return (
            <Router>
                <div className="container">
                    <Header />

                    <Switch>
                        <Route path="/" exact component={ TeamListView } />
                        <Route path="/:id" component={ TeamDetailView } />
                    </Switch>

                    <Footer />

                </div >
            </Router>

        );
    }
}

export default App;