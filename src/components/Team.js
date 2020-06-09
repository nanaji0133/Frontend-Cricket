import React, { Component } from "react";
import TeamComponent from "./TeamComponent";

class Team extends Component
{
    constructor()
    {
        super();
        this.state = {
            teamsData: [],
            dataLoaded: false,
            teamFields: {
                team_name: "",
                team_rank: "",
            }
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
        fetch("http://127.0.0.1:8000/team/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({ team_name: team_name, team_rank: team_rank })
        })
            .then(res =>
            {
                console.log(res);
                this.fetchTeams();
                this.setState({ team_name: "" });
                this.setState({ team_rank: "" });
            })
            .catch(error => console.log(error));

    };

    handleEdit = (event) =>
    {
        this.setState({ teamFields: event });
    };


    render ()
    {
        const teamDataDisplay = this.state.dataLoaded && this.state.teamsData.map(data =>
            <TeamComponent key={ data.id } data={ data }
                handleEdit={ () => this.handleEdit(data) } />
        );
        return (

            <div id="team">
                <div className="container mb-10">
                    { !this.state.dataLoaded ? <h1>Loading...</h1> : teamDataDisplay }
                </div>
                <form id="my-form" onSubmit={ this.handleSubmit }>
                    <div className="form-group m-1">
                        <input type="text" className="form-control col-4"
                            id="formGroupExampleInput" placeholder="team name"
                            name="team_name"
                            value={ this.state.teamFields.team_name }
                            onChange={ this.handleChange }
                        />
                    </div>
                    <div className="form-group m-1">
                        <input type="number" className="form-control col-4"
                            id="formGroupExampleInput" placeholder="team rank"
                            name="team_rank" value={ this.state.teamFields.team_rank }
                            onChange={ this.handleChange }
                        />
                    </div>
                    <button className="btn btn-primary m-1">Submit</button>
                </form>

            </div>
        );
    }
}

export default Team;