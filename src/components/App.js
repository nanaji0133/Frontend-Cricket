import React, { Component } from "react";
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import Team from "./Team";

class App extends Component
{
    render ()
    {
        return (
            <div className="container">
                <Header />
                <Team />
                <Footer />
            </div>
        );
    }
}

export default App;