import axios from "axios";
import React, { Component } from "react";
import PlayerForm from "./PlayerForm";

class PlayerCreate extends Component
{
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
        axios.post("http://127.0.0.1:8000/team/players/", data, {
            headers: {
                "Content-type": "application/json"
            },
            // auth: {
            //     username: "sanka",
            //     password: "nanaji@5357"
            // }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
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