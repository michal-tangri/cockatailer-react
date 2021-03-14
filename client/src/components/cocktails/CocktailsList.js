import React, { useEffect, useState } from "react";

import CocktailCard from "./CocktailCard";
import SearchEngine from "../SearchEngine";

export default function CocktailsList() {
    const [originalValues, setOriginalValues] = useState([]);
    const [cocktails, setCocktails] = useState([]);

    const callAPI = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cocktails?apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(response => {
                setCocktails(response);
                setOriginalValues(response);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => callAPI(), []);

    const onSearchEngineChange = (text, checkbox) => {
        if (text !== '') {
            text = text.toLowerCase().replace(/\s/g, '');
            setCocktails(originalValues.filter(cocktail => {
                if (cocktail.name.toLowerCase().replace(/\s/g, '').includes(text))
                    return true;
                return false;
            }));
            if (checkbox === true) {
                setCocktails(originalValues.filter(cocktail => {
                    if (cocktail.alcohol === "no")
                        return true;
                    return false;
                }));
            }
        } else {
            setCocktails(originalValues);
        }
    }

    return (
        <>
            <div className="row text-center justify-content-center">
                <div className="col-lg-6 justify-content-center">
                    <SearchEngine onChange={onSearchEngineChange} />
                </div>
            </div>
            <div className="row" style={{ marginTop: "30px" }}>
                {
                    cocktails.map((cocktail, i) => {
                        return (
                            <div key={i} className="col-lg-4 col-md-6">
                                <CocktailCard cocktailData={cocktail} />
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}