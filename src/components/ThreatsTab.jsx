import React from 'react';
import BarChart from './Charts/BarChart';
import './App.css';
import PropTypes from 'prop-types';

function ThreatsTab({data}) {
    return (
        <div id = "Content">
            <h2>{data.name}</h2>
            <h4><br/>Urbanization</h4>
            <svg width="100%" height="220">
                <rect x="0" y="0" width="100%" height="50" fill = "#AC69B3"/>
                <rect x="0" y="50" width="100%" height="60" fill = "#AE76DE"/>
                <rect x="0" y="110" width="100%" height="40" fill = "#79529B"/>
                <rect x="0" y="150" width="100%" height="20" fill = "purple"/>
                <rect x="0" y="170" width="100%" height="50" fill = "#4D2B58"/>
                <BarChart data={[1.5,2.1,3.9,5.45,6]} size={[320,220]} />
            </svg>
            <h4>Sea Level Rise</h4>
            <svg width="100%" height="220">
                <g>
                    <rect x="0" y="0" width="100%" height="60" fill = "#C7E1F5"/>
                    <text x="120" y="50" fontSize={10} fill = "gray">Not affected  -  0%</text>
                </g>
                <g>
                    <rect x="0" y="60" width="100%" height="50" fill = "#76BEF8"/>
                    <text x="2" y="90" fontSize={10} fill="black">3m  -  50%</text>
                </g>
                <g>
                    <rect x="0" y="110" width="100%" height="40" fill = "#4A90E2"/>
                    <text x="2" y="135" fontSize={10} fill="black">2m  -  35%</text>
                </g>
                <g>
                    <rect x="0" y="150" width="100%" height="15" fill = "#0D5AB3"/>
                    <text x="2" y="160" fontSize={10} fill="black">1m  -  15%</text>
                </g>
                <rect x="0" y="10" width="100%" height="220" fill="url(#landprofile)"></rect>
            </svg>
        </div>
    );
}

ThreatsTab.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        name: PropTypes.string
    })
}

export default ThreatsTab;
