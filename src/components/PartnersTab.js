import React from 'react';
import PropTypes from 'prop-types';
import planURLs from '../configplanURLs';

let ownershipColors = {
    FED: '#2ca02c',
    STP: '#1f77b4',
    LOC: '#aec7e8',
    TNC: '#98df8a',
    PNP: '#ad494a',
    PFP: '#ff7f0e',
    PLO: '#d62728',
    TRB: '#9467bd',
    UNK: '#c49c94'
};

let gapColors = {
    1: '#637939',
    2: '#b5cf6b',
    3: '#98df8a',
    39: '#e7cb94',
    4: '#d62728',
    9: '#9edae5'
};

function TabFour({data}) {
    console.log(data.gap);
    console.log(data.owner);
    let position = [
        0,
        0,
        0,
        0,
        0
    ];

    let positionowners = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    Object.keys(data.gap).map((num,i)=>
        position[i+1] = data.gap[num] * 2 + position[i]);
    Object.keys(data.owner).map((num, i)=>
        positionowners[i+1]= data.owner[num] * 2 + positionowners[i]);

    console.log(position[0] , position [1] , position [2], position [3]);
    console.log(positionowners[0], positionowners[1], positionowners[2], positionowners[3])
    return (

        <div id = "Content">
            <h2>{data.name}</h2>
            <h4>Conserved Lands Ownership</h4>
            <p>
                <svg width="100%" height="200">
                    <rect width= "100%" height = "100%" fill = '#D3D3D3'/>
                    {
                        Object.keys(data.gap).map((num, i)=>
                            <rect x="0" y={position[i]} width="520" height={data.gap[num]*2} fill = {gapColors[num]}/>
                        )}
                </svg>
                <br/>
                Legend
                <br/>
            </p>
            <h4>Land Protection Status</h4>
            <p>
                <svg width="100%" height="200">
                    <rect width= "100%" height = "100%" fill = '#D3D3D3'/>
                    {
                        Object.keys(data.owner).map((num, i)=>
                            <rect x="0" y={positionowners[i]} width="520" height={data.owner[num]*2} fill = {ownershipColors[num]}/>
                        )}
                </svg>
                <br/>
                Legend
                <br/>
            </p>

            <h4>Conservation Plans</h4>
            <ul>{data.plans.map((num, i)=>
            <li key={i}>{num}</li>
            )}
            </ul>
            <h4>Land Trusts</h4>
            <ul>
                {Object.keys(data.counties).map((num, i)=>
                <li key={i}>{num} {data.counties[num]}</li>)}
            </ul>

        </div>

    );
}

TabFour.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        name: PropTypes.string,
        gap: PropTypes.shape({
            2: PropTypes.number,
            3: PropTypes.number,
            39: PropTypes.number
        })
    })
};

export default TabFour;
