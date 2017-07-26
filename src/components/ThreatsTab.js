import React from 'react';
import BarChart from './Charts/BarChart';
import './App.css';
import PropTypes from 'prop-types';

function TabThree({data}) {
    return (
        <div id = "Content">
            <h2>{data.name}</h2>
            <h4>Urbanization</h4>
            <svg width="100" height="250">
                <rect x="0" y="50" width="100%" height="50" fill = "#AC69B3"/>
                <rect x="0" y="100" width="100%" height="60" fill = "#AE76DE"/>
                <rect x="0" y="160" width="100%" height="40" fill = "#79529B"/>
                <rect x="0" y="200" width="100%" height="20" fill = "purple"/>
                <rect x="0" y="220" width="100%" height="50" fill = "#4D2B58"/>
                <BarChart data={[1,3,5,5.5,6]} size={[500,250]} />
            </svg>
            <h4>Sea Level Rise</h4>
            <svg width="320" height="220">
                <rect x="0" y="0" width="100%" height="60" fill = "#C7E1F5"/>
                <rect x="0" y="60" width="100%" height="50" fill = "#76BEF8"/>
                <rect x="0" y="110" width="100%" height="40" fill = "#4A90E2"/>
                <rect x="0" y="150" width="100%" height="15" fill = "#1C4F78"/>
                <rect x="0" y="10" width="100%" height="220" fill="url(#landprofile)"></rect>
            </svg>
        </div>
    );
}

TabThree.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        name: PropTypes.string
    })
}

export default TabThree;
