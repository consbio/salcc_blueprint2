import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-simple-flex-grid';



let gapConfig = {
    1: {
        color: '#637939',
        label: 'Permanent protection for biodiversity',
        detail: ' Nature reserves, research natural areas, wilderness areas, Forever Wild easements'
    },
    2: {
        color: '#b5cf6b',
        label: 'Permanent protection to maintain a primarily natural state',
        detail: ' National Wildlife Refuges, many State Parks, high-use National Parks'
    },
    3: {
        color: '#98df8a',
        label: 'Permanently secured for multiple uses and in natural cover',
        detail: ' State forests, lands protected from development by forest easements'
    },
    39: {
        color: '#e7cb94',
        label: 'Permanently secured and in agriculture or maintained grass cover',
        detail: ' Agricultural easements'
    },
    4: {
        color: '#d62728',
        label: 'Unsecured (already developed temporary easements and/or municipal lands)',
        detail: ' Private lands with no easements, city parks, undesignated state lands '
    },
    9: {
        color: '#9edae5',
        label: 'Unknown - protection status unknown',
        detail: 'Protection status unknown'
    }
};


let ownershipConfig = {
    FED: {
        color: '#2ca02c',
        label: 'Federal'
    },
    STP: {
        color: '#1f77b4',
        label: 'State/province'
    },
    LOC: {
        color: '#aec7e8',
        label: 'Local'
    },
    TNC: {
        color: '#98df8a',
        label: 'The Nature Conservancy'
    },
    PNP: {
        color: '#ad494a',
        label: 'Private non-profit'
    },
    PFP: {
        color: '#ff7f0e',
        label: 'Private for-profit'
    },
    PLO: {
        color: '#d62728',
        label: 'Private land owner'
    },
    TRB: {
        color: '#9467bd',
        label: 'Tribal'
    },
    UNK: {
        color: '#c49c94',
        label: 'Ownership unknown'
    }
};



function PartnersTab({data}) {
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

    let sum = 100 - Object.keys(data.gap).reduce(function(prevVal,elem){return prevVal+ data.gap[elem]}, 0);

    let ownersum = 100 - Object.keys(data.owner).reduce(function(prevVal,elem){return prevVal+ data.owner[elem]}, 0);
    return (

        <div id = "Content">
            <section>
                <h2>Conserved Lands Ownership</h2>
                <div>
                    {Object.keys(data.gap).map((num, i)=>
                        <div>
                            <div className="flex-container2">
                                <div className="flex-item2" >{gapConfig[num].label}</div>
                                <div className="flex-item3">
                                    {"(" + parseInt(data.gap[num]) + '%)'}
                                </div>
                            </div>
                            <div className="flex-container">
                            <svg width ="300" height="5">
                                        <rect width = "100%" height="100%" fill="#ececec"/>
                                        <rect key={i} width = {data.gap[num] * 3} height= "100%" fill = "#0892D0"/>
                            </svg>
                            </div>
                            <br/>
                        </div>
                    )}
                    <div>
                    <div className="flex-container2">
                        <div className="flex-item2">Not conserved </div>
                        <div className="flex-item3">
                            {' (' + parseInt(sum) + '%)'}
                        </div>
                    </div>
                        <div className="flex-container">
                            <svg width ="300" height="5">
                                <rect width = "100%" height="100%" fill="#ececec"/>
                                <rect width = {sum * 3} height= "100%" fill = "#0892D0"/>

                            </svg>
                        </div>
                    </div>
                    <br/>
                </div>
            </section>

            <section>
                <h2>Land Protection Status</h2>
                <div>
                    {Object.keys(data.owner).map((num, i)=>
                        {
                            const {color, label} = ownershipConfig[num];

                            return <div><div className="flex-container2">
                                <div className="flex-item2" >{label}</div>
                                <div className="flex-item2">
                                    {' (' + parseInt(data.owner[num]) + '%)'}
                                </div>
                            </div>
                            <div className="flex-container">
                                    <svg width ="300" height="5">
                                        <rect width = "100%" height="100%" fill="#ececec"/>
                                        <rect key={i} width = {data.owner[num] * 3} height= "100%" fill = "#0892D0"/>
                                    </svg>
                            </div>
                                <br/>
                            </div>
                        }
                    )}
                    <div>
                    <div className="flex-container2">
                        <div className="flex-item2">Not conserved</div>
                        <div className="flex-item2">
                           ({parseInt(ownersum)}%)
                        </div>
                    </div>
                        <div className="flex-container">
                            <svg width ="300" height="5">
                                <rect width = "100%" height="100%" fill="#ececec"/>
                                <rect width = {ownersum * 3} height= "100%" fill = "#0892D0" />
                            </svg>
                        </div>
                    </div>
                    <br/>
                </div>
            </section>

            <section>
                <h2>Land Trusts</h2>
                <div>
                {Object.keys(data.counties).map((num, i)=>
                    <div className="flex-container2">
                        <div className="flex-item2">
                            <svg width ="7" height="7">
                                <rect width = "100%" height= "100%" fill = "#D3D3D3"/>
                            </svg>
                        </div>
                        <div className="flex-item2"><a href = {"http://findalandtrust.org/counties/"+ num} target="_blank">{data.counties[num]}</a>
                        </div>
                    </div>)}
                </div>
            </section>
        </div>
    );
}


// TODO:
// PartnersTab.propTypes = {
//     data: PropTypes.shape({
//         name: PropTypes.string,
//         gap: PropTypes.shape({
//             2: PropTypes.number,
//             3: PropTypes.number,
//             39: PropTypes.number
//         })
//     })
// };

export default PartnersTab;
