import React, { Component } from "react";

class PlayerForm extends Component
{

    render ()
    {
        const teamOptions = this.props.teamList.map((data, index) => <option key={ data.id } value={ data.id } >{ data.team_name }</option>);
        //team, user
        return (
            <div>
                <form id="players-form" onSubmit={ this.props.handleSubmit }>
                   
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Country: </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" value={ this.props.country } name="country" onChange={ this.props.handleChange } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Style: </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" value={ this.props.style } name="style" onChange={ this.props.handleChange } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Team: </label>
                        <select name="team" id="exampleFormControlSelect"
                            onChange={ this.props.handleChange }>
                            { teamOptions }
                        </select>
                    </div>
                    <button className="btn btn-primary m-1">Submit</button>

                </form>
            </div>
        );
    }
}

export default PlayerForm;