import React, { Component } from "react";


class Header extends Component
{
    render ()
    {
        return (

            <nav className="navbar fixed-top navbar-dark bg-dark" id ="my-nav">
                <h1 className="navbar-brand">Teams</h1>
            </nav>

        );
    }
}

export default Header;