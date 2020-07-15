import React from 'react';

const Singin = () =>
{
    return (
        <div id="auth">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">user name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User name" />

                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password1" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword2">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password2" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Singin;