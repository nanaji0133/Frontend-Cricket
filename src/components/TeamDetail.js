import React, { Component } from "react";
import TeamComponent from "./TeamComponent";
import TeamFormComponent from "./TeamFormComponent";

class TeamDetail extends Component
{
    constructor(props)
    {
        console.log(props.match);
        super(props);
        this.state = {
            teamData: {},
            dataLoaded: false,
            existing: true,
            teamFields: {
                id: props.match.params.id,
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

    componentDidMount ()
    {
        this.fetchTeam();
    }


    fetchTeam = () =>
    {
        fetch(`http://127.0.0.1:8000/team/${this.state.teamFields.id}/`)
            .then(res => console.log(res.json()))
            .then(data =>
            {
                console.log(data);
                !data && this.setState({ existing: false });
                this.setState({ teamData: data, dataLoaded: true });
            })
            .catch(error => console.log(error));
    };

    handleChange = (event) =>
    {
        console.log(event.target.value);
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
        console.log(this.state.teamFields.id);
        let csrftoken = this.getCookie("csrftoken");
        let team_name = this.state.teamFields.team_name;
        let team_rank = this.state.teamFields.team_rank;

        fetch(`http://127.0.0.1:8000/team/${this.state.teamFields.id}/`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({ team_name: team_name, team_rank: team_rank })
        })
            .then(res =>
            {
                this.fetchTeam();
                this.setState({ editing: false });
            })
            .catch(error => console.log(error));

    };

    editTeam = () =>
    {
        this.setState({
            teamFields: {
                id: this.state.teamData.id,
                team_name: this.state.teamData.team_name,
                team_rank: this.state.teamData.team_rank
            },
            editing: true
        });
    };

    deleteTeam = () =>
    {

        let url = `http://127.0.0.1:8000/team/${this.state.teamFields.id}/`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res =>
            {
                this.setState({ dataLoaded: false });
                console.log("deleted");
            })
            .catch(error => console.log(error));
    };

    render ()
    {


        return (

            <div id="team">

                <div className="container mb-10">
                    {
                        !this.state.existing ? "not existing" :
                            this.state.dataLoaded &&
                            <TeamComponent key={ this.state.teamFields.id }
                                data={ this.state.teamData }
                                existing={ this.state.existing }
                                editTeam={ () => this.editTeam(this.state.teamsData) }
                                deleteTeam={ () => this.deleteTeam(this.state.teamsData) }
                            />
                    }

                </div>

                { this.state.editing &&
                    <TeamFormComponent
                        handleChange={ this.handleChange }
                        handleSubmit={ this.handleSubmit }
                        { ...this.state }
                    />
                }

                <button className="btn btn-primary btn-sm p-2 m-2 ml-1" id="my-btn"
                    onClick={ this.editTeam } >
                    Edit
                </button>
                <button className="btn btn-dark btn-sm p-2 m-2 ml-1" id="my-btn"
                    onClick={ this.deleteTeam } >
                    Delete
                </button>



            </div>
        );
    }
}

export default TeamDetail;