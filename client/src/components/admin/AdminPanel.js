import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

import AddCocktailForm from "./AddCocktailForm";
import CommentApproval from "./CommentApproval";
import RemoveCocktailsList from "./RemoveCocktailsList";

export default function AdminPanel({ match }) {
    const [validToken, setValidToken] = useState();
    const [commentsToApprove, setCommentsToApprove] = useState();

    const getData = async () => {
        const apikey = process.env.REACT_APP_API_KEY;

        await fetch(`${process.env.REACT_APP_API_URL}/comments/unapproved?apikey=${apikey}`)
            .then(response => response.json())
            .then(response => setCommentsToApprove(response))
            .catch(error => error);

        await fetch(`${process.env.REACT_APP_API_URL}/auth/validate?apikey=${apikey}`, {
            method: 'POST',
            body: JSON.stringify({ token: sessionStorage.getItem("token") }),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }).then(response => response.json())
            .then(response => setValidToken(response.valid))
            .catch(error => error);
    };

    useEffect(() => getData(), []);

    if (validToken === true) {

        return (
            <>
                <div className="row text-center">
                    <div className="col-lg-4">
                        <Link to={`${match.url}/addCocktail`}><p className="common-button">Add cocktail</p></Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to={`${match.url}/removeCocktails`}><p className="common-button">Remove cocktails</p></Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to={`${match.url}/comments`}><p className="common-button">Manage comments</p></Link>
                    </div>
                </div>
                <Route path={`${match.path}/addCocktail`}>
                    <div className="row">
                        <div className="col-lg-12">
                            <AddCocktailForm />
                        </div>
                    </div>
                </Route>
                <Route path={`${match.path}/removeCocktails`}>
                    <div className="row">
                        <div className="col-lg-12">
                            <RemoveCocktailsList />
                        </div>
                    </div>
                </Route>
                <Route path={`${match.path}/comments`}>
                    <div className="row">
                        <div className="col-lg-12" >
                            <CommentApproval commentsState={commentsToApprove} setCommentsState={setCommentsToApprove} />
                        </div>
                    </div>
                </Route>
            </>
        );
    } else if (validToken === false) {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="alert alert-danger">You do not have sufficient permissions to view this page</div>
                </div>
            </div>
        );
    } else {
        return null;
    }

}