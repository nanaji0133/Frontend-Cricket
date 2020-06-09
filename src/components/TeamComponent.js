import React from "react";

function TeamComponent (props)
{
    return (
        <div className="container p-2 m-2">
            <ul>
                <li>team name: { props.data.team_name } </li>
                <li>team rank: { props.data.team_rank }</li>
            </ul>
            <button className="btn btn-primary btn-sm p-2 mb-2"   id="my-btn">Edit</button>
            <button className="btn btn-dark btn-sm p-2 mb-2 ml-1" id="my-btn">Delete</button>
        </div>
    );
}

export default TeamComponent;