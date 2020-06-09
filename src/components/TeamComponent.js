import React from "react";

function TeamComponent (props)
{
    return (
        <div className="container p-2 m-2">
            <ul>
                <li>team name: { props.data.team_name } </li>
                <li>team rank: { props.data.team_rank }</li>
            </ul>
            <button className="btn btn-primary p-2 m-2" >Edit</button>
            <button className="btn btn-primary p-2 m-2" >Delete</button>
        </div>
    );
}

export default TeamComponent;