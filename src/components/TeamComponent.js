import React from "react";

function TeamComponent (props)
{
    let players = props.data.players.map((data) =>
        <li key={ data.toString() } > { data }</li>);

    return (
        <div className="container p-2 m-2">

            <h1 onClick={ props.getTeam }>team name: { props.data.team_name } </h1>
            <h4>rank: { props.data.team_rank }</h4>
            <h5>Players </h5>
            <ul>
                { !players.length == 0 ? players : "no players" }
            </ul>

            <button className="btn btn-primary btn-sm p-2 mb-2" id="my-btn"
                onClick={ props.editTeam } >
                Edit
                </button>
            <button className="btn btn-dark btn-sm p-2 mb-2 ml-1" id="my-btn"
                onClick={ props.deleteTeam } >
                Delete
             </button>
        </div>
    );
}

export default TeamComponent;