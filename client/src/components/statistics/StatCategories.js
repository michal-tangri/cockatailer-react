import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

import TypesStats from "./TypesStats";
import GlassesStats from "./GlassesStats";

export default function StatCategories({ match }) {
    const [cocktails, setCocktails] = useState({ waitForResponse: true});

    const callAPI = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cocktails?apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(response => setCocktails(response))
            .catch(error => console.log(error));
    }

    useEffect(() => callAPI(), []);

    const PrepareTypesStats = () => {
        return <TypesStats cocktails={cocktails} />
    };

    const PrepareGlassesStats = () => {
        return <GlassesStats cocktails={cocktails} />
    };

    if (typeof cocktails.waitForResponse != 'undefined')
        return null;

    return (
        <>
            <div className="row text-center">
                <div className="col-lg-6">
                    <Link to={`${match.url}/types`}><p className="common-button">Types</p></Link>
                </div>
                <div className="col-lg-6">
                    <Link to={`${match.url}/glasses`}><p className="common-button">Glasses</p></Link>
                </div>
            </div>
            <Route path={`${match.path}/types`} component={PrepareTypesStats} />
            <Route path={`${match.path}/glasses`} component={PrepareGlassesStats} />
        </>
    );
}