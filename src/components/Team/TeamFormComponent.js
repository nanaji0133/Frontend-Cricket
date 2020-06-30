import React from "react";

function TeamFormComponent (props)
{
    return (
        <form id="my-form" onSubmit={ props.handleSubmit }>
            <div className="form-group m-1">
                <input type="text" className="form-control col-4"
                    id="formGroupExampleInput" placeholder="team name"
                    name="team_name"
                    value={ props.teamFields.team_name }
                    onChange={ props.handleChange }
                />
            </div>
            <div className="form-group m-1">
                <input type="number" className="form-control col-4"
                    id="formGroupExampleInput" placeholder="team rank"
                    name="team_rank" value={ props.teamFields.team_rank }
                    onChange={ props.handleChange }
                />
            </div>
            <button className="btn btn-primary m-1">Submit</button>
        </form>
    );
}

export default TeamFormComponent;