import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function TabOne({data}) {
    return (
        <div id = "Content">
        <h2>Watershed Name</h2>

            <svg width="520" height="220">
                <rect x="0" y="0" width="520" height="10" fill = "#4A0068"/>
                <rect x="0" y="10" width="520" height="50" fill = "#C40988"/>
                <rect x="0" y="60" width="520" height="50" fill = "#FAB3BA"/>
                <rect x="0" y="110" width="520" height="10" fill = "#D3D3D3"/>
                <rect x="0" y="120" width="520" height="50" fill = "gray"/>
            </svg>
            <ul>
                {data.map((num,i) =>
                    <li key={i}>{num}</li>
                )}
            </ul>
        </div>
    );
}

TabOne.propTypes = {
    data: PropTypes.array
}

export default TabOne;
