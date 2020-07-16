import axios from "axios";
import React, { Component } from "react";
import { AuthContext } from "../../AuthContext/authContex";
import PlayerForm from "./PlayerForm";

class PlayerCreate extends Component
{

    static contextType = AuthContext;
    constructor()
    {
        super();
        this.state = {
            country: "",
            style: "",
            team: "",
            teamList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount ()
    {

        axios.get("http://127.0.0.1:8000/team/")
            .then(res =>
            {
                this.setState({ teamList: res.data });
            })
            .catch(err => console.log(err));
    }

    handleChange (event)
    {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit (event)
    {
        event.preventDefault();
        const data = {
            country: this.state.country,
            style: this.state.style,
            team: this.state.team,
        };
        const { authTokens } = this.context;
        console.log(authTokens);
        axios.post("http://127.0.0.1:8000/team/players/", data, {
            headers: {
                "Authorization": `Token ${authTokens.key}`,
                "Content-type": "application/json"
            },
        })
            .then(res => console.log(res))
            .catch(function (error)
            {
                if (error.response)
                {

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request)
                {

                    console.log(error.request);
                } else
                {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    render ()
    {
        return (
            <div id="players">
                <PlayerForm handleChange={ this.handleChange }
                    handleSubmit={ this.handleSubmit } { ...this.state } />
            </div>
        );
    }
}

export default PlayerCreate;