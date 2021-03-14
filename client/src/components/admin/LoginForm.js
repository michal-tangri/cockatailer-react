import React, { useRef, useState } from "react";

export default function LoginForm({ onSuccessfulLogin = f => f }) {

    const [error, setError] = useState();
    const usernameField = useRef();
    const passwordField = useRef();

    const onSubmit = async e => {
        e.preventDefault();
        const apikey = process.env.REACT_APP_API_KEY;
        await fetch(`${process.env.REACT_APP_API_URL}/auth?apikey=${apikey}`, {
            method: 'POST',
            body: JSON.stringify({ username: usernameField.current.value, password: passwordField.current.value }),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }).then(response => response.status === 200 ? response.json() : null)
            .then(response => {
                if (response === null)
                    return setError('Invalid username or password')
                sessionStorage.setItem('token', response.token)
                window.location.reload()
            })
            .catch(error => error);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8">
                <form id="login-form" onSubmit={onSubmit}>
                    <div className="text-center">
                        <h2>Admin sign in</h2>
                    </div>
                    {error !== undefined ? <div className="alert alert-danger">{error}</div> : <></>}
                    <div className="form-group">
                        <input ref={usernameField} className="form-control" type="text" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                        <input ref={passwordField} className="form-control" type="password" placeholder="Password" required />
                    </div>
                    <button className="common-button">Sign in</button>
                </form>
            </div>
        </div>
    );
}