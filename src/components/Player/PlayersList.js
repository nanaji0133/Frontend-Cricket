import axios from "axios";
import React, { Component } from "react";
import PlayerContainer from "./PlayerContainer";

class PlayersList extends Component
{
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            players: [],
        };
    }

    componentDidMount ()
    {
        axios.get("http://127.0.0.1:8000/team/players/",{
            // headers: {
            //     Authorization: "Token 31cb63540921b8f7027fcb2dfd0cd95eb05cc405"
            // }
            // auth: {
            //     username: "sanka",
            //     password: "nanaji@5357"
            // }
        })
            .then(res =>
            {
                this.setState({
                    players: res.data,
                    isLoaded: true
                });
                // console.log(this.state.players);
                console.log(res);
            })
            .catch(err =>
            {
                if (err.response)
                {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                if (err.request)
                {
                    console.log(err.request);
                } else
                {
                    console.log(err.message);
                }
            });
    }

    render ()
    {
        const playersList = this.state.isLoaded &&
            this.state.players.map((data, index) =>
                <PlayerContainer key={ data.id } { ...data } />
            );
        return (
            <div id="players">
                <div>
                    { playersList }
                </div>
            </div>
        );
    }

}

// kjasdkas
export default PlayersList;