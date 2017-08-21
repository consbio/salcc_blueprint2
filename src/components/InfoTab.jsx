import React, {Component} from 'react';
import './App.css';

export const BLUEPRINT = {
    0: {
        label: 'Not a priority',
        area: '50%',
        description: '',
        color: '#D3D3D3',
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
                    <span className="text-small">{area} of region</span>
                </div>
                <p>{description}</p>
            </div>
        )
    }

    render() {
        const sortedPriorities = [4, 3, 2, 1]; // 0 deliberately omitted

        return (
            <div id = "Content" className="tabs-top">
                <h3>Conservation Blueprint 2.1</h3>

                <section>
                    <p>
                        The Conservation Blueprint is a living spatial plan to conserve
                        natural and cultural resources for future generations.
                        It identifies priority areas for <b>shared conservation action</b>.
                    </p>
                    <p>
                        Blueprint 2.1 is a completely data-driven approach based on models of
                        current indicator condition and connectivity for key ecosystems in
                        the region.
                        Indicators in better condition suggest higher ecosystem integrity and
                        higher importance for natural and cultural resources.
                        Development of the Blueprint is a collaborative process that has
                        involved active participation from more than 400 people across more
                        than 100 different organizations.
                    </p>
                    <p>
                        <b>You can help improve the Blueprint</b>
                        <br/>
                        Give us your feedback and let us know about issues:
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
                        <a href="http://www.southatlanticlcc.org/blueprint/" target="_blank">
                            More information about the Blueprint.
                        </a>
                    </p>
                </section>

                <section>
                    <h3>Blueprint Priorities</h3>
                    { sortedPriorities.map(this.renderPriority) }
                </section>

                <section>
                    <h3>Credits</h3>
                    <p>
                        Developed by the&nbsp;
                        <a href="https://consbio.org" target="_blank">
                            Conservation Biology Institute
                        </a>&nbsp;
                        in partnership with the&nbsp;
                        <a href="" target="_blank">
                            South Atlantic Landscape Conservation Cooperative
                        </a>.
                    </p>

                    <p>
                        Citation: South Atlantic Landscape Conservation Cooperative.
                        2016. The Conservation Blueprint Version 2.1.
                    </p>

                    <p>
                        Basemaps credit<br/>
                        <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a><br/>
                        <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a><br/>
                        <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a><br/>
                        (note: applies to the basemap, not the Blueprint)
                    </p>
                </section>
            </div>
        );
    }
}

export default InfoTab;
