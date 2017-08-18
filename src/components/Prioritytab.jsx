import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const colors = [
    '#D3D3D3',
    '#686868',
    '#fbb4b9',
    '#c51b8a',
    '#49006a'
];

function PriorityTab({data}) {
    const position = [
        0,
        data.blueprint[0]*2,
        data.blueprint[0]*2+data.blueprint[1]*2,
        data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2,
        data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2+data.blueprint[3]*2,
        data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2+data.blueprint[3]*2+data.blueprint[4]*2
    ];

    let sum = 100 - (data.blueprint[1] + data.blueprint[2] + data.blueprint[3] +data.blueprint[4]);

    return (
        <div id = "Content">
            {/*<h2>{data.name}</h2>*/}
            <div>
            <svg width="100%" height="200">
                {
                    data.blueprint.map((num, i)=>
                        <rect key={i} x="0" y={position[i]} width="520" height={num*2} fill = {colors[i]}/>
                    )}
            </svg>
            </div>
            <div>
            <div className="flex-container2">
                <div className="flex-item2">
                    <svg width ="17" height="17">
                        <rect width = "100%" height= "100%" fill = "#D3D3D3" stroke="gray" strokeWidth="2"/>
                    </svg>
                </div>
                <div className="flex-item2">Not a priority {sum}%</div>
            </div>
            <div className="flex-container2">
                <div className="flex-item2">
                    <svg width ="17" height="17">
                        <rect width = "100%" height= "100%" fill = {colors[1]} stroke="gray" strokeWidth="2"/>
                    </svg>
                </div>
                <div className="flex-item2">Corridors {data.blueprint[1]}%</div>
            </div>
            <div className="flex-container2">
                <div className="flex-item2">
                    <svg width ="17" height="17">
                        <rect width = "100%" height= "100%" fill = {colors[2]} stroke="gray" strokeWidth="2"/>
                    </svg>
                </div>
                <div className="flex-item2">Medium priority {data.blueprint[2]}%</div>
            </div>
            <div className="flex-container2">
                <div className="flex-item2">
                    <svg width ="17" height="17">
                        <rect width = "100%" height= "100%" fill = {colors[3]} stroke="gray" strokeWidth="2"/>
                    </svg>
                </div>
                <div className="flex-item2">High priority {data.blueprint[3]}%</div>
            </div>
            <div className="flex-container2">
                <div className="flex-item2">
                    <svg width ="17" height="17">
                        <rect width = "100%" height= "100%" fill = {colors[4]} stroke="gray" strokeWidth="2"/>
                    </svg>
                </div>
                <div className="flex-item2">Highest priority {data.blueprint[4]}%</div>
            </div>
            </div>
            <br/>

            <h4>Justification</h4>
            <p>{data.justification}</p>

        </div>
    );
}

PriorityTab.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        blueprint: PropTypes.array,
        justification: PropTypes.string,
        name: PropTypes.string
    })
}

export default PriorityTab;
