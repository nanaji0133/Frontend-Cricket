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
            teamName: "",
            teamRank: "",
        };
    }

    componentDidMount ()
    {
        fetch("http://127.0.0.1:8000/team/")
            .then(res => res.json())
            .then(data =>
            {
                this.setState({ teamsData: data });
                this.setState({ dataLoaded: true });
            });
    }

    handleChange = (event) =>
    {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(value);
    };

    handleSubmit = (event) =>
    {
        event.preventDefault();
        console.log("submitted");
    };
    render ()
    {
        const teamDataDisplay = this.state.dataLoaded && this.state.teamsData.map(data =>
            <TeamComponent key={ data.id } data={ data } />
        );
        return (

            <div id="team">
                <div className="container mb-10">
                    { teamDataDisplay }
                </div>
                <form id="my-form" onSubmit={ this.handleSubmit }>
                    <div className="form-group m-1">
                        <input type="text" className="form-control col-4"
                            id="formGroupExampleInput" placeholder="team name"
                            name="teamName" value={ this.state.teamName }
                            onChange={ this.handleChange }
                        />
                    </div>
                    <div className="form-group m-1">
                        <input type="number" className="form-control col-4"
                            id="formGroupExampleInput" placeholder="team rank"
                            name="teamRank" value={ this.state.teamRank }
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