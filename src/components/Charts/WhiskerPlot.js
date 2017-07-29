import React from 'react';
import WhiskerDes from './WhiskerDescription';
//import PropTypes from 'prop-types';
import indicators from '../../configindica';
import {scale, linear, range} from 'd3';

const textHeight = 12;

        // const radius = this.props.radius;
const height = 100;
const midY = height / 2;
const width = 300;
const radius = 18;

const margin = {
    left: radius + 2 + 30, // these were based on word sizes
    right: radius + 2,
    top: 10, // may not need as much space without labels
    bottom: 14
};

function configindicators(indicatorname){
    return Object.keys(indicators).map((thing, index)=>
        <div className="flex-container2">
            <div className="flex-item2"><h4>{thing +' '}</h4></div>
            <div className="flex-item2"> <p>{indicators[thing] + '% )'}</p></div>
        </div>);
}

function dataindicatorarray(values, indicatorname){
    return <div>
        <ul>
            {values[indicatorname].map((num, i)=>
                <li key={i}>{num}</li>
            )}
        </ul>
        <ul>
            {Object.keys(indicators[indicatorname]).map((indica, j)=>
                <li key={j}>{indica + ': '+ indicators[indicatorname][indica]} </li>
            )}
        </ul>
    </div>
}

function renderIndicatorDescription(indicatornameinfo){
    return <WhiskerDes indicatordes = {indicatornameinfo}/>
}

function Whisker({indicatorname, values}) {
    const x = scale.linear().range([margin.left, width - margin.left]).domain(indicators[indicatorname].range);
const {value} = values[indicatorname][1];
    return (
        <div>
            <div>{dataindicatorarray(values, indicatorname)}</div>
            <div className="indicator-chart">
            <svg width="296" height="100">
                <text x="10.8" y="20" textAnchor="begin" fill='#a4aab3' fontSize={14}>{indicators[indicatorname].label}</text>
                    <line className='rangeLine' x1={10} x2={width -10} y1={midY} y2={midY} fill='#a4aab3' />
                    <text x={x.range()[0] - 18 - 4} y={midY + textHeight +10} textAnchor='end' fill='#a4aab3' fontSize={10}>Low</text>
                    <text x={x.range()[0] + 208 + 4} y={midY + textHeight + 10} textAnchor='begin' fill='#a4aab3' fontSize={10}>High</text>
                    <rect x={50} y={midY -20} width="40" height="40" fill="url(#frogicon)"></rect>
            </svg>
            </div>

        </div>

    );
}

Whisker.defaultProps ={
    label: 'Forested Wetland Birds'
};

export default Whisker;
