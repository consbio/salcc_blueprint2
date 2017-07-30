import React from 'react';
import PropTypes from 'prop-types';
import planURLs from '../configplanURLs';
import plans2 from '../configplans.js';

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

var ownershipLabels = {
    FED: 'Federal',
    STP: 'State/province',
    LOC: 'Local',
    TNC: 'The Nature Conservancy',
    PNP: 'Private non-profit',
    PFP: 'Private for-profit',
    PLO: 'Private land owner',
    TRB: 'Tribal',
    UNK: 'Ownership unknown'
};

var gapLabels = {
    1: 'Permanent protection for biodiversity|e.g., Nature reserves, research natural areas, wilderness areas, Forever Wild easements',
    2: 'Permanent protection to maintain a primarily natural state|e.g., National Wildlife Refuges, many State Parks, high-use National Parks',
    3: 'Permanently secured for multiple uses and in natural cover|e.g., State forests, lands protected from development by forest easements',
    39: 'Permanently secured and in agriculture or maintained grass cover|e.g., Agricultural easements',
    4: 'Unsecured (already developed temporary easements and/or municipal lands)|e.g., Private lands with no easements, city parks, undesignated state lands ',
    9: 'Unknown - protection status unknown|Protection status unknown'
};

function TabFour({data}) {
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

    return (

        <div id = "Content">
            <h2>{data.name}</h2>
            <h4>Conserved Lands Ownership</h4>
            <div>
                <svg width="100%" height="200">
                    <rect width= "520" height = "100%" fill = '#D3D3D3'/>
                    {
                        Object.keys(data.gap).map((num, i)=>
                            <rect key={i} x="0" y={position[i]} width="520" height={data.gap[num]*2} fill = {gapColors[num]}/>
                        )}
                </svg>
                <br/>
                {Object.keys(data.gap).map((num, i)=>
                    <div className="flex-container2">
                        <div className="flex-item2">
                            <svg width ="15" height="15">
                                <rect key={i} width = "100%" height= "100%" fill = {gapColors[num]} stroke="gray" strokeWidth="1"/>
                            </svg>
                        </div>
                        <div className="flex-item2" >{gapLabels[num]+ ' (' + data.gap[num] + '%)'}</div>
                    </div>
                )}
                <div className="flex-container2">
                    <div className="flex-item2">
                        <svg width ="15" height="15">
                            <rect width = "100%" height= "100%" fill = "#D3D3D3" stroke="gray" strokeWidth="1"/>
                        </svg>
                    </div>
                    <div className="flex-item2">Not conserved</div>
                </div>
                <br/>
            </div>
            <h4>Land Protection Status</h4>
            <div>
                <svg width="100%" height="200">
                    <rect width= "520" height = "100%" fill = '#D3D3D3'/>
                    {
                        Object.keys(data.owner).map((num, i)=>
                            <rect key={i} x="0" y={positionowners[i]} width="520" height={data.owner[num]*2} fill = {ownershipColors[num]}/>
                        )}
                </svg>
                <br/>
                {Object.keys(data.owner).map((num, i)=>
                    <div className="flex-container2">
                        <div className="flex-item2">
                            <svg width ="15" height="15">
                                <rect key={i} width = "100%" height= "100%" fill = {ownershipColors[num]} stroke="gray" strokeWidth="1"/>
                            </svg>
                        </div>
                        <div className="flex-item2" >{ownershipLabels[num] + ' (' + data.owner[num] + '%)'}</div>
                    </div>
                )}
                <div className="flex-container2">
                    <div className="flex-item2">
                        <svg width ="15" height="15">
                            <rect width = "100%" height= "100%" fill = "#D3D3D3" stroke="gray" strokeWidth="1"/>
                        </svg>
                    </div>
                    <div className="flex-item2">Not conserved</div>
                </div>
                <br/>
            </div>

            <h4>Conservation Plans</h4>
            {data.plans.map((num, i)=>
                <div className="flex-container2">
                    <div className="flex-item2">
                        <svg width ="7" height="7">
                            <rect width = "100%" height= "100%" fill = "#D3D3D3"/>
                        </svg>
                    </div>
                    <div className="flex-item2"><a href={planURLs[num]}>{plans2[num]}</a></div>
                </div>
            )}
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
