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


let plansConfig = {
    'ACJV': {
        label: 'ACJV migratory bird priority areas',
        detail: 'Atlantic Coast Joint Venture (ACJV)/ South Atlantic Migratory Bird Initiative (SAMBI) Priority Areas',
        url: 'http://acjv.org/planning/bird-conservation-regions/sambi/'
    },
    'EPA': {
        label: 'EPA priority watersheds',
        detail: 'Environmental Protection Agency (EPA) Region 4 Priority Watersheds (except Virginia)',
        url: 'http://www.epa.gov/region4/water/watersheds/priority.html'
    },
    'PARCA': {
        label: 'Amphibian and reptile conservation',
        detail: 'Partners in Amphibian & Reptile Conservation (PARC) Priority Areas',
        url: 'http://www.separc.org/'
    },
    'NBCI': {
        label: 'Bobwhite conservation areas',
        detail: 'National Bobwhite Conservation Initiative (NBCI) Plan',
        url: 'http://bringbackbobwhites.org/'
    },
    'TNC': {
        label: "TNC's conservation priorities",
        detail: "The Nature Conservancy's (TNC) Ecoregional Priorities for the Mid-Atlantic Coastal Plain, South Atlantic Coastal Plain, and Piedmont",
        url: 'http://www.landscope.org/focus/understand/tnc_portfolio/'
    },
    'Alabama': {
        label: 'AL Strategic Habitat Units',
        detail: 'Alabama Strategic Habitat Units',
        url: 'http://www.alh2o.org/shus/'
    },
    'Florida': {
        label: 'FL Critical Lands & Waters',
        detail: 'Florida Critical Lands and Waters (CLIP)',
        url: 'http://www.fnai.org/clip.cfm'
    },
    'Georgia': {
        label: 'GA Priority Waters',
        detail: 'Georgia Priority Waters',
        url: 'http://www.georgiawildlife.com/node/1377'
    },
    'NorthCarolina': {
        label: 'NC Green Growth Toolbox',
        detail: 'Integrated priorities from the NC Green Growth Toolbox',
        url: 'http://www.ncwildlife.org/Conserving/Programs/GreenGrowthToolbox.aspx'
    },
    'Virginia': {
        label: 'VA Natural Landscapes Assessment',
        detail: 'Virginia Natural Landscapes Assessment',
        url: 'http://www.dcr.virginia.gov/natural_heritage/vaconvisvnla.shtml'
    },
    'ImportantBirdAreas': {
        label: 'Important Bird Areas',
        detail: 'Important Bird Areas',
        url: null
    },
    'NC_Capes': {
        label: 'NC Seashore Viewsheds',
        detail: '5 mile buffer around NC Capes',
        url: null
    },
    'RightWhale': {
        label: 'Right Whale Habitat',
        detail: 'Right Whale Critical Habitat',
        url: 'http://www.nmfs.noaa.gov/pr/species/mammals/cetaceans/rightwhale_northatlantic.htm'
    },
    'SAFMC_HAPC_wDeepwater_Coral': {
        label: 'Habitat areas of particular concern',
        detail: 'All habitat areas of particular concern (HAPC) from the South Atlantic Fisheries Management Council',
        url: 'http://safmc.net/'
    },
    'SnapperHAPC': {
        label: 'Snapper habitat areas',
        detail: 'Snapper habitat areas of particular concern (HAPC) from the South Atlantic Fisheries Management Council',
        url: 'http://safmc.net/'
    },
    'ViewSheds': {
        label: 'Viewsheds',
        detail: 'Buffer around National Seashores',
        url: null
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
            {/*<h2>{data.name}</h2>*/}
            <h4>
                Conserved Lands Ownership</h4>
            <div>
                {Object.keys(data.gap).map((num, i)=>
                    <div>
                        <div className="flex-container2">
                            <div className="flex-item2" >{gapConfig[num].label}</div>
                            <div className="flex-item3">
                                {"(" + data.gap[num] + '%)'}
                            </div>
                        </div>
                        <div className="flex-container">
                        <svg width ="300" height="5">
                                    <rect width = "100%" height="100%" fill="#d3d3d3"/>
                                    <rect key={i} width = {data.gap[num] * 3} height= "100%" fill = "#0892D0" stroke="gray" strokeWidth="1"/>
                        </svg>
                        </div>
                        <br/>
                    </div>
                )}
                <div>
                <div className="flex-container2">
                    <div className="flex-item2">Not conserved </div>
                    <div className="flex-item3">
                        {' (' + sum + '%)'}
                    </div>
                </div>
                    <div className="flex-container">
                        <svg width ="300" height="5">
                            <rect width = "100%" height="100%" fill="#d3d3d3"/>
                            <rect width = {sum * 3} height= "100%" fill = "#0892D0" stroke="gray" strokeWidth="1"/>

                        </svg>
                    </div>
                </div>
                <br/>
            </div>
            <h4>Land Protection Status</h4>
            <div>
                {Object.keys(data.owner).map((num, i)=>
                    {
                        const {color, label} = ownershipConfig[num];

                        return <div><div className="flex-container2">
                            <div className="flex-item2" >{label}</div>
                            <div className="flex-item2">
                                {' (' + data.owner[num] + '%)'}
                            </div>
                        </div>
                        <div className="flex-container">
                                <svg width ="300" height="5">
                                    <rect width = "100%" height="100%" fill="#d3d3d3"/>
                                    <rect key={i} width = {data.owner[num] * 3} height= "100%" fill = "#0892D0" stroke="gray" strokeWidth="1"/>
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
                       ({ownersum}%)
                    </div>
                </div>
                    <div className="flex-container">
                        <svg width ="300" height="5">
                            <rect width = "100%" height="100%" fill="#d3d3d3"/>
                            <rect width = {ownersum * 3} height= "100%" fill = "#0892D0" stroke="gray" strokeWidth="1"/>
                        </svg>
                    </div>
                </div>
                <br/>
            </div>

            <h4>Conservation Plans</h4>
            {data.plans.map((num, i)=>
                {
                    let {label, url} = plansConfig[num];

                    return <div>
                        <div className="flex-container2">
                            <div className="flex-item2">
                                <svg width ="7" height="7">
                                    <rect width = "100%" height= "100%" fill = "#D3D3D3"/>
                                </svg>
                            </div>
                            <div className="flex-item2">
                                {url ? <a href={url} target="_blank">{label}</a> : {label} }
                            </div>

                        </div>
                        <div className="flex-container2">
                            <div className="flex-item2">
                                <svg width ="7" height="7">
                                    <rect width = "100%" height= "100%" fill = "white"/>
                                </svg>
                            </div>
                            <div className="flex-item2">
                                <p>{plansConfig[num].detail}</p>
                            </div>
                        </div>
                    </div>
                }
            )}
            <br/>
            <h4>Land Trusts</h4>
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

    );
}

PartnersTab.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        gap: PropTypes.shape({
            2: PropTypes.number,
            3: PropTypes.number,
            39: PropTypes.number
        })
    })
};

export default PartnersTab;
