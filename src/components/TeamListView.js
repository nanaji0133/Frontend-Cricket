import React, { Component } from "react";
import { Link } from "react-router-dom";
import TeamComponent from "./TeamComponent";

class TeamListView extends Component
{
    constructor()
    {
        super();
        this.state = {
            teamsData: [],
            dataLoaded: false,
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
                console.log(data);
                this.setState({ teamsData: data });
                this.setState({ dataLoaded: true });
            });
    };

    render ()
    {
        const teamDataDisplay = this.state.dataLoaded &&
            this.state.teamsData.map(data =>
                <Link to={`/${data.id}`}>
                    <TeamComponent key={ data.id } data={ data } />
                </Link>
            );

        return (
            <div id="team">
                <div className="container mb-10">
                    { teamDataDisplay }
                </div>
            </div>
        );
    }
}

export default TeamListView;