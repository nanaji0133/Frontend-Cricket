import React, { Component } from "react";
import TeamComponent from "./TeamComponent";

class TeamListView extends Component
{
    constructor({ match })
    {
        console.log(match);
        const id = match.params.id;
        super();
        this.state = {
            teamsData: {},
            dataLoaded: false,
            id: id
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
        console.log();

        fetch(`http://127.0.0.1:8000/team/${this.state.id}`)
            .then(res => res.json())
            .then(data =>
            {
                console.log(data);
                this.setState({ teamsData: data });
                this.setState({ dataLoaded: true });
            })
            .catch(error => console.log(error));
    };

    render ()
    {
        const teamDataDisplay = this.state.dataLoaded &&
            <TeamComponent key={ this.state.id } data={ this.state.teamsData } />;

        return (
            <div id="team">
                <div className="container mb-10">
                    { teamDataDisplay }
                </div>
                <button className="btn btn-primary btn-sm p-2 mb-2" id="my-btn"
                    onClick={ this.editTeam } >
                    Edit
                </button>
                <button className="btn btn-dark btn-sm p-2 mb-2 ml-1" id="my-btn"
                    onClick={ this.deleteTeam } >
                    Delete
             </button>
            </div>
        );
    }
}

export default TeamListView;