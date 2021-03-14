import React, { useEffect, useState } from "react";

import CocktailCard from "../cocktails/CocktailCard";

export default function RemoveCocktailsList() {
    const [cocktails, setCocktails] = useState({ waitForResponse: true });
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const callAPI = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cocktails?apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(response => setCocktails(response))
            .catch(error => console.log(error));
    }

    useEffect(() => callAPI(), []);

    const onDelete = id => {
        setSuccessMessage(undefined);
        setErrorMessage(undefined);
        fetch(`${process.env.REACT_APP_API_URL}/cocktails/${id}?apikey=${process.env.REACT_APP_API_KEY}`, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                setSuccessMessage(`${cocktails.find(cocktail => cocktail.id === id).name} has been removed.`)
                let updatedCocktails = cocktails.filter(cocktail => cocktail.id !== id);
                setCocktails(updatedCocktails);
            } else {
                setSuccessMessage(`Could not remove ${cocktails.find(cocktail => cocktail.id === id).name}`)
            }
        })
    }
    if (cocktails.waitForResponse === undefined) {
        return (
            <>
                <div className="row">
                    <div className="col-lg-12">
                        {successMessage !== undefined ? <div className="alert alert-success">{successMessage}</div> : <></>}
                        {errorMessage !== undefined ? <div className="alert alert-danger">{errorMessage}</div> : <></>}
                    </div>
                </div>

                <div className="row">
                    {
                        cocktails.map((cocktail, i) => {
                            return (
                                <div key={i} className="col-lg-4 col-md-6">
                                    <CocktailCard cocktailData={cocktail} />
                                    <p className="btn btn-danger" onClick={() => onDelete(cocktail.id)} style={{ width: "100%" }}>Remove this cocktail</p>
                                </div>
                            );
                        })
                    }
                </div>
            </>
        );
    } else {
        return null;
    }
}