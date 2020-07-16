import axios from "axios";
import React, { Component } from "react";
import { AuthContext } from "../../AuthContext/authContex";
import PlayerContainer from "./PlayerContainer";
import PlayerForm from "./PlayerForm";


class PlayerDetail extends Component
{
    static contextType = AuthContext;
    constructor()
    {
        super();
        this.state = {
            isLoaded: false,
            playerDetail: {},
            editing: false,
            teamList: {},
            team: "",
            style: "",
            country: "",
        };
    }

    componentDidMount ()
    {
        Promise.all([axios.get(`http://127.0.0.1:8000/team/players/${this.props.match.params.id}/`), axios.get(`http://127.0.0.1:8000/team/`)])
            .then(axios.spread((res1, res2) =>
            {
                console.log(res1.data);
                this.setState({
                    playerDetail: res1.data,
                    teamList: res2.data,
                    isLoaded: true,
                });
            }))
            .catch(err => console.log(err));
    }

    handleSubmit = (e) =>
    {
        const { authTokens } = this.context;
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/team/players/${this.props.match.params.id}/`, {
            team: this.state.team, style: this.state.style, country: this.state.country
        }, {
            headers: {
                "Authorization": `Token ${authTokens.key}`
            }
        })
            .then(res => this.setState({ playerDetail: res.data, isLoaded: true }))
            .then(err => console.log(err));
    };
    handleDelete = () =>
    {
        axios.delete(`http://127.0.0.1:8000/team/players/${this.props.match.params.id}`)
            .then(res => console.log(res.data))
            .then(err => console.log(err));
    };

    handleClick = () => this.setState({
        team: this.state.playerDetail.team,
        style: this.state.playerDetail.style,
        country: this.state.playerDetail.country,
        editing: true
    });

    handleChange = (e) =>
    {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    render ()
    {
        const playerDetail = this.state.isLoaded &&
            <PlayerContainer key={ this.state.playerDetail.id }
                { ...this.state.playerDetail } />;
        return (
            <div id="players">
                { playerDetail }
                <button onClick={ this.handleClick }  >
                    edit</button>
                <button onClick={ this.handleDelete }>delete</button>
                { this.state.editing &&
                    <PlayerForm teamList={ this.state.teamList }
                        team={ this.state.team } country={ this.state.country } style={ this.state.style }
                        handleChange={ this.handleChange } handleSubmit={ this.handleSubmit }
                    /> }
            </div>
        );
    }
}

export default PlayerDetail;