import React from "react";

import { Link } from "react-router-dom";

export default function CocktailCard({ cocktailData }) {
    return (
        <Link to={`/cocktails/${cocktailData.id}`}>
            <div className="cocktail-card">
                <div className="card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={cocktailData.photo} className="card-img-top" alt="Cocktail" />
                            </div>
                            <div className="col-md-9">
                                <h5 className="card-title">{cocktailData.name}</h5>
                                <i className="card-text">Contains alcohol: <b>{cocktailData.alcohol}</b></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}