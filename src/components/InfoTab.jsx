import React, {Component} from 'react';
import './App.css';

export const BLUEPRINT = {
    0: {
        label: 'Not a priority',
        area: '50%',
        description: '',
        color: '#FFFFC8',
        textColor: '#333'
    },
    1: {
        label: 'Corridors',
        area: '5%',
        description: 'These are connections between large patches of highest priority areas and secured lands, optimized for efficiency and indicator condition in a least cost path analysis.',
        color: '#686868',
        textColor: '#FFF'
    },
    2: {
        label: 'Medium priority',
        area: '20%',
        description: 'Above-average areas for natural and cultural resources based on indicator condition, capturing potential restoration opportunities.',
        color: '#fbb4b9',
        textColor: '#333'
    },
    3: {
        label: 'High priority',
        area: '15%',
        description: 'Important areas for natural and cultural resources based on indicator condition.',
        color: '#c51b8a',
        textColor: '#FFF'
    },
    4: {
        label: 'Highest priority',
        area: '10%',
        description: 'The most important areas for natural and cultural resources based on indicator condition.',
        color: '#49006a',
        textColor: '#FFF'
    }
};


class InfoTab extends Component {
    renderPriority(priority) {
        const {label, area, description, color, textColor} = BLUEPRINT[priority];

        return (
            <div key={priority}>
                <div className="priorityColorPatch"
                     style={{backgroundColor: color, color: textColor}}>
                    <b>{label}</b>
                    <br/>
                    <span className="text-small">{area} of SALCC</span>
                </div>
                <p>{description}</p>
            </div>
        )
    }

    render() {
        const sortedPriorities = [4, 3, 2, 1]; // 0 deliberately omitted

        return (
            <div id="Content" className="tabs-top flex-container-column">
                <h3>Conservation Blueprint 2.1</h3>

                <section>
                    <p>
                        The Conservation Blueprint is a living spatial plan to conserve natural and cultural resources
                        for future generations. It identifies priority areas for shared conservation action.
                        Blueprint 2.1 is completely data-driven, prioritizing the lands and waters of the South Atlantic
                        region based on ecosystem indicator models and a connectivity analysis. Better indicator condition
                        suggests higher ecosystem integrity and higher importance for natural and cultural resources
                        across all ecosystems collectively. So far, more than 400 people from 100 organizations
                        actively participated in the collaborative development of the Blueprint.
                    </p>
                    <p>
                        <b>You can help improve the Blueprint</b>
                        <br/>
                        Give us your feedback:
                        <br/>
                        email <a href="mailto:southatlanticlcc@gmail.com">southatlanticlcc@gmail.com</a>
                        <br/><br/>
                        or call Hilary Morris (Blueprint User Support):
                        <br/>
                        <a href="tel:19197070252">(919) 707-0252</a>
                    </p>
                    <p>
                        This <b>Simple Viewer</b> summarizes the Blueprint 2.1 priorities
                        and supporting information within subwatersheds and marine lease blocks.
                        <br/>
                        <a href="http://www.southatlanticlcc.org/blueprint/" target="_blank" rel="noopener noreferrer">
                            More information about the Blueprint.
                        </a>
                    </p>
                </section>

                <section>
                    <h3>Blueprint Priorities</h3>
                    { sortedPriorities.map(this.renderPriority) }
                </section>

                <section>
                    <h3>How To Use This Viewer</h3>
                    <p>
                        Once you have zoomed in far enough, the map will show boundaries of areas that you can select for
                        more information.  Tap on an area to show details.  Clear the selected area by tapping that area
                        again, or tap the close button in the upper right.
                        <br/><br/>
                        Use the tabs at the bottom of the screen to navigate the different types of summary information available.
                        <br/><br/>
                        On the Indicators tab, you can swipe between ecosystems to see the average value for each indicator
                        present in that area.
                        <br/><br/>
                        Tap on an indicator to see more details.
                    </p>
                </section>

                <section>
                    <h3>Credits</h3>
                    <h4>Application developed by:</h4>

                    <div  style={{fontSize: 14, marginBottom: 20}}>
                        <div>
                            <img src="/consbio.png" style={{height: 26, padding:8, verticalAlign: 'middle'}} alt="CBI Logo"/>
                            <div className="inline-middle" style={{width:250}}>
                                <a href="https://consbio.org" target="_blank" rel="noopener noreferrer">
                                    Conservation Biology Institute
                                </a>
                            </div>
                        </div>

                        <div>
                            <img src="/logo_96x96.png" style={{height: 32, padding:6, verticalAlign: 'middle'}} alt="SALCC Logo"/>
                            <div className="inline-middle" style={{width:250}}>
                                <a href="" target="_blank" rel="noopener noreferrer">
                                    South Atlantic Landscape Conservation Cooperative
                                </a>
                            </div>
                        </div>
                    </div>

                    <h4>Citation:</h4>
                    <p>
                        South Atlantic Landscape Conservation Cooperative.
                        2016. The Conservation Blueprint Version 2.1.
                    </p>

                    <h4>Land ownership and conservation status:</h4>
                    <p>
                        Secured Lands Database from TNC Eastern Division - 2014 Edition.
                    </p>

                    <h4>Basemaps:</h4>
                    <p>
                        <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener noreferrer">© Mapbox</a><br/>
                        <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a><br/>
                        <a href="https://www.mapbox.com/map-feedback/" target="_blank" rel="noopener noreferrer">Improve this map</a><br/>
                        <span className="text-small text-quiet">(note: applies to the basemap, not the Blueprint)</span>
                    </p>

                    <h4>Icons:</h4>
                    <p>
                        Priorities, Indicators, and Partners icons made by <a href="https://www.flaticon.com/authors/those-icons" target="_blank" rel="noopener noreferrer">Those Icons</a>  <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer" title="Creative Commons BY 3.0">CC 3.0 BY</a> <span className="text-small text-quiet">(from <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" title="Flaticon">www.flaticon.com</a>)</span>
                    </p>
                </section>
            </div>
        );
    }
}

export default InfoTab;
