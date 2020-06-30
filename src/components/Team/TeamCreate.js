import React, { Component } from "react";
import TeamFormComponent from "./TeamFormComponent";

class TeamCreate extends Component
{
    constructor()
    {
        super();
        this.state = {
            created: false,
            teamFields: {
                id: "",
                team_name: "",
                team_rank: "",
            },
        };
    }

    getCookie = (name) => 
    {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '')
        {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++)
            {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '='))
                {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };


    handleChange = (event) =>
    {
        const { name, value } = event.target;
        this.setState({
            teamFields: {
                ...this.state.teamFields,
                [name]: value
            }
        });
    };

    handleSubmit = (event) =>
    {
        event.preventDefault();
        let csrftoken = this.getCookie("csrftoken");
        let team_name = this.state.teamFields.team_name;
        let team_rank = this.state.teamFields.team_rank;

        let url = "http://127.0.0.1:8000/team/";
        let metd = "POST";

        fetch(url, {
            method: metd,
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({ team_name: team_name, team_rank: team_rank })
        })
            .then(res =>
            {
                this.setState({
                    created: true,
                    teamFields: {
                        team_name: "",
                        team_rank: "",
                    }
                });
            })
            .catch(error => console.log(error));

    };

    render ()
    {
        return (

            <div className="container">
                <TeamFormComponent
                    handleChange={ this.handleChange }
                    handleSubmit={ this.handleSubmit }
                    { ...this.state }
                />
                <div>{this.state.created && <h4>Team has been created</h4> }</div>
            </div>
        );
    }
}

export default TeamCreate;