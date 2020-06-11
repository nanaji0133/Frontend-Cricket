import React, { Component } from "react";
import TeamComponent from "./TeamComponent";
import TeamFormComponent from "./TeamFormComponent";

class Team extends Component
{
    constructor()
    {
        super();
        this.state = {
            teamsData: [],
            dataLoaded: false,
            teamFields: {
                id: "",
                team_name: "",
                team_rank: "",
            },
            editing: false
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

    componentDidMount ()
    {
        this.fetchTeams();
    }

    fetchTeams = () =>
    {
        fetch("http://127.0.0.1:8000/team/")
            .then(res => res.json())
            .then(data =>
            {
                this.setState({ teamsData: data });
                this.setState({ dataLoaded: true });
            });
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

        if (this.state.editing)
        {
            url = `http://127.0.0.1:8000/team/${this.state.teamFields.id}/`;
            metd = "PUT";
            this.setState({ editing: false });
        }

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
                    teamFields: {
                        team_name: "",
                        team_rank: "",
                    }
                });
                this.fetchTeams();
            })
            .catch(error => console.log(error));

    };

    editTeam = (event) =>
    {
        this.setState({
            teamFields: {
                id: event.id,
                team_name: event.team_name,
                team_rank: event.team_rank
            },
            editing: true
        });
    };

    deleteTeam = (event) =>
    {

        let url = `http://127.0.0.1:8000/team/${event.id}/`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res =>
            {
                this.fetchTeams();
            })
            .catch(error => console.log(error));
    };


    render ()
    {
        const teamDataDisplay = this.state.dataLoaded && this.state.teamsData.map(data =>
            <TeamComponent key={ data.id } data={ data }
                editTeam={ () => this.editTeam(data) }
                deleteTeam={ () => this.deleteTeam(data) } />
        );

        return (

            <div id="team">
                <div className="container mb-10">
                    { teamDataDisplay }
                </div>

                <TeamFormComponent
                    handleChange={ this.handleChange }
                    handleSubmit={ this.handleSubmit }
                    { ...this.state }
                />


            </div>
        );
    }
}

export default Team;