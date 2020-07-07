import axios from "axios";
import React, { Component } from "react";
import PlayerContainer from "./PlayerContainer";
axios.defaults.headers.common["Authorization"] = "Basic bWFsaW5nYTpuYW5hamlANTM1Nw=="
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
        axios.get("http://127.0.0.1:8000/team/players/"
        // , {
        //     auth: {
        //         username: "malinga",
        //         password: "nanaji@5357"
        //     }
        // }
        )
            .then(res =>
            {
                this.setState({
                    players: res.data,
                    isLoaded: true
                });
                // console.log(this.state.players);
                console.log(res)
            })
            .catch(err => console.log(err));
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