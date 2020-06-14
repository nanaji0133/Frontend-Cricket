import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component
{
    render ()
    {
        return (

            <nav className="navbar fixed-top navbar-dark bg-dark" id="my-nav">

                <div >
                    <h1 className="navbar-brand">Cricket</h1>
                </div>

                <ul id="my-nav-list">
                    <Link to="/teams">
                        <li>Teams</li>
                    </Link>
                </ul>
            </nav>

        );
    }
}

export default Header;