import React from "react";

import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

export default function TypesStats({ cocktails }) {

    const wAlcohol = cocktails.filter((cocktail) => cocktail.alcohol === "yes").length;
    const woAlcohol = cocktails.filter((cocktail) => cocktail.alcohol === "no").length;

    const chartData = [
        { type: "With alcohol", amount: wAlcohol },
        { type: "Without alcohol", amount: woAlcohol }
    ]

    return (
        <>
            <div className="row justify-content-center text-center">
                <div className="col-lg-6">
                    <h1>With alcohol</h1>
                    <p style={{ fontSize: "96px" }}>{wAlcohol}</p>
                </div>
                <div className="col-lg-6">
                    <h1>Without alcohol</h1>
                    <p style={{ fontSize: "96px" }}>{woAlcohol}</p>
                </div>
            </div>
            <div className="row justify-content-center text-center">
                <div className="col-lg-8 text-white">
                    <Paper>
                        <Chart data={chartData} >
                            <ArgumentAxis />
                            <ValueAxis />
                            <BarSeries valueField="amount" argumentField="type" color="#C3073F" barWidth="0.4" />
                            <Title text="Drinks with and without alcohol" />
                            <Animation />
                        </Chart>
                    </Paper>
                </div>
            </div>
        </>
    );
}  