import React, { useRef, useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import './chart.css'
// import Legend from "./Legend";
// import data from "./data.json";

const Chart = (store) => {
    var data = store.store.store.getState().data

    var county = data.NAME
    if (county != "US Total") {
        county = county + " County"
    }
    
    const width = 400;
    
    return (
        <div className='chart-container'>
            <Plot 
                data = {[
                    {
                        values: Object.values(data.age_data),
                        labels: Object.keys(data.age_data),
                        type: 'pie'
                    }
                ]}
                layout={ {height: 300, title: county + ' Age Demographics', width: width, legend: {y: 1.25}} }
            />
            <Plot
                data = {[
                    {
                        values: Object.values(data.finance_data),
                        labels: Object.keys(data.finance_data),
                        type: 'pie'
                    }
                ]}
                layout={ {height: 300, title: county + ' Finance Demographics', width: width, legend: {y: 1.25}}}
            />
            <Plot
                data = {[
                    {
                        values: Object.values(data.race_data),
                        labels: Object.keys(data.race_data),
                        type: 'pie'
                    }
                ]}
                layout={ {height: 300, title: county + ' Race Demographics', width: width, legend: {y: 1.25}}}
            />
            <Plot
                data = {[
                    {
                        values: Object.values(data.education_data),
                        labels: Object.keys(data.education_data),
                        type: 'pie'
                    }
                ]}
                layout={ {height: 300, title: county + ' Education Demographics', width: width, legend: {y: 1.25}}}
            />
            <Plot
                data = {[
                    {
                        y: Object.values(data.social_data),
                        x: Object.keys(data.social_data),
                        type: 'bar'
                    }
                ]}
                layout={ {height: 300, title: county + ' Info', width: width, legend: {y: 1.25}}}
            />
        </div>
      );
}

export default Chart;