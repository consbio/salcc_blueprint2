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
            {/*<h1>{data.name}</h1>*/}
            <section>
                {/*<div>*/}
                    {/*<svg width="100%" height="200">*/}
                        {/*{*/}
                            {/*data.blueprint.map((num, i)=>*/}
                                {/*<rect key={i} x="0" y={position[i]} width="520" height={num*2} fill = {colors[i]}/>*/}
                            {/*)}*/}
                    {/*</svg>*/}
                {/*</div>*/}
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
            </section>

            <section>
                <h4>Justification (Blueprint 1.0 Workshop Feedback)</h4>
                <p>{data.justification}</p>
            </section>

            <section>
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
            </section>

            <section>
                <h4>Land Trusts</h4>
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

PriorityTab.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        blueprint: PropTypes.array,
        justification: PropTypes.string,
        name: PropTypes.string
    })
}

export default PriorityTab;
