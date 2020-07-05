import React, { Component } from "react";


class PlayerContainer extends Component
{
    constructor()
    {
        super();
        this.state = {

        };
    }

    componentDidMount ()
    {
        // axios.get("")
    }

    render ()
    {
        return (
            <div>
                <h2>Player: { this.props.user } </h2>
                <ul>
                    <li>Country: { this.props.country } </li>
                    <li>Style: { this.props.style } </li>
                    <li>Team: {this.props.team} </li>
                </ul>
            </div>
        );
    }
}

export default PlayerContainer;