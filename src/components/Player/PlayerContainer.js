import axios from "axios";
import React, { Component } from "react";


class PlayerContainer extends Component
{
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            teamName: "",
            playerName: "" //player name is the user filed
        };
    }

    componentDidMount ()
    {
        axios.all([axios.get(`http://127.0.0.1:8000/team/${this.props.team}`), axios.get(`http://127.0.0.1:8000/team/users/${this.props.user}`)])
            .then(axios.spread((res1, res2) =>
            {
                this.setState({
                    teamName: res1.data.team_name,
                    playerName: res2.data.username,
                    isLoaded: true
                });
                console.log(res1.data, res2.data);

            }))
            .catch(err => console.log(err));
    }

    render ()
    {

        if (!this.state.isLoaded)
        {
            return null;
        }
        
        return (
            <div>
                <h2>Player: { this.state.playerName } </h2>
                <ul>
                    <li>Country: { this.props.country } </li>
                    <li>Style: { this.props.style } </li>
                    <li>Team: { this.state.teamName } </li>
                </ul>
            </div>
        );
    }
}

export default PlayerContainer;