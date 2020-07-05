import axios from "axios";
import React, { Component } from "react";
import PlayerContainer from "./PlayerContainer";


class PlayerDetail extends Component
{
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            playerDetail: {}
        };
    }

    componentDidMount ()
    {
        axios.get(`http://127.0.0.1:8000/team/players/${this.props.match.params.id}`)
            .then(res =>
            {
                console.log(res.data);
                this.setState({
                    playerDetail: res.data,
                    isLoaded: true,
                });
            })
            .catch(err => console.log(err));
    }

    render ()
    {
        const playerDetail = this.state.isLoaded &&
            <PlayerContainer key={ this.state.playerDetail.id }
                { ...this.state.playerDetail } />;
        return (
            <div id="players">
                { playerDetail }
            </div>
        );
    }
}

export default PlayerDetail;