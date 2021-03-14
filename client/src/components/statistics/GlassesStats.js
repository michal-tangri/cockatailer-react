import React from "react";

import Paper from '@material-ui/core/Paper';
import { Animation } from '@devexpress/dx-react-chart';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import glasses from "../../data/glasses.json";

export default function GlassesStats({ cocktails }) {

    const data = glasses['glasstypes'].map(glass => {
        return { type: glass, amount: 0};
    });

    for (let cocktail of cocktails) {
        const index = data.findIndex(glass => glass.type === cocktail.glass)
        if (index !== -1) {
            data[index].amount++;
        }
    }

    const filteredData = data.filter(glass => glass.amount !== 0);

    return (
        <>
            <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Glass</td>
                                <td>Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.map((glass, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{glass.type}</td>
                                            <td>{glass.amount}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row justify-content-center text-center">
                <div className="col-lg-12 text-white">
                    <Paper>
                        <Chart data={filteredData} >
                            <ArgumentAxis />
                            <ValueAxis />
                            <BarSeries valueField="amount" argumentField="type" color="#C3073F" barWidth="0.2" />
                            <Title text="Amount of drinks served in specific glass types" />
                            <Animation />
                        </Chart>
                    </Paper>
                </div>
            </div>
        </>
    );
}  