import React from 'react';
import HelloChart from './HelloChart';
import BarChart from './BarChart';
import './App.css';

function TabThree() {
    return (
        <div>
            <div><HelloChart/></div>
            <BarChart data={[1,3,5,10]} size={[500,250]} />
        </div>
    );
}

export default TabThree;
