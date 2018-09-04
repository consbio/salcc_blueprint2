/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ResetIcon from '../icons/outline-cancel-24px.svg'

import PRIORITIES from '../../config/priorities.json'

const InfoTab = ({ isMobile }) => {
    const sortedPriorities = [5, 4, 3, 2, 1] // 0 deliberately omitted

    const renderPriority = (priority) => {
        const {
            label, area, description, color, textColor
        } = PRIORITIES[priority]

        return (
            <div key={priority}>
                <div className="priorityColorPatch" style={{ backgroundColor: color, color: textColor }}>
                    <b>{label}</b>
                    <br />
                    <span className="text-small text-right">{area} of South Atlantic</span>
                </div>
                <p>{description}</p>
            </div>
        )
    }

    return (
        <div id="Content" className="flex-container-column">
            <section>
                <h3>Welcome to the South Atlantic Conservation Blueprint Simple Viewer</h3>
                <p>
                    The{' '}
                    <a href="http://www.southatlanticlcc.org/blueprint/" rel="noopener noreferrer">
                        Conservation Blueprint
                    </a>{' '}
                    is a living spatial plan to conserve natural and cultural resources for future generations. It
                    identifies priority areas for shared conservation action. Blueprint 2.2 is completely data-driven,
                    prioritizing the lands and waters of the South Atlantic region based on ecosystem indicator models
                    and a connectivity analysis. Better indicator condition suggests higher ecosystem integrity and
                    higher importance for natural and cultural resources across all ecosystems collectively. So far,
                    more than 500 people from 150 organizations actively participated in the collaborative development
                    of the Blueprint.
                </p>
                <p>
                    This <b>Simple Viewer</b> summarizes the Blueprint priorities and supporting information within
                    subwatersheds and marine lease blocks. In a new pixel mode, you can also explore pixel-level details
                    of what indicators are driving the Blueprint priorities.
                </p>
            </section>

            <section>
                <h3>Blueprint Priorities</h3>
                {sortedPriorities.map(renderPriority)}
            </section>

            <section>
                <h3>How To Use This Viewer</h3>
                {isMobile ? (
                    <React.Fragment>
                        <h4 style={{ marginBottom: '0.5em' }}>Subwatershed and marine lease block details:</h4>
                        <p>
                            Use the <b>Map</b> tab to explore the Blueprint across the South Atlantic region. Zoom in to
                            show boundaries of subwatersheds or marine lease blocks that you can tap for more
                            information.
                            <br />
                            <br />
                            Use the tabs at the bottom of the screen to navigate the different types of summary
                            information available.
                            <br />
                            <br />
                            On the Indicators tab, you can swipe between ecosystems or click on an ecosystem icon to see
                            the average value for each indicator present in that area. Tap or click on an indicator to
                            see more details.
                            <br />
                            <br />
                            To unselect the area, click on the{' '}
                            <ResetIcon style={{ marginBottom: '-0.5em', fill: '#666' }} /> button in the upper right or
                            click on the unit again in the map.
                        </p>

                        <h4 style={{ marginBottom: '0.5em' }}>To find a specific area:</h4>
                        <p>
                            Use the <b>Find location</b> tab to search for a place by name. When you tap on a place to
                            select it from the list, it will show a marker at that location on the map.
                        </p>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h4 style={{ marginBottom: '0.5em' }}>Subwatershed and marine lease block details:</h4>
                        <p>
                            Use the map to explore the Blueprint across the South Atlantic region. Zoom in to show
                            boundaries of subwatersheds or marine lease blocks that you can click on for more
                            information.
                            <br />
                            <br />
                            Use the tabs in the sidebar to navigate the different types of summary information
                            available.
                            <br />
                            <br />
                            On the Indicators tab, you can see the average value for each indicator present in that
                            area. Click on an indicator for more information about it.
                            <br />
                            <br />
                            To unselect the area, click on the{' '}
                            <ResetIcon style={{ marginBottom: '-0.5em', fill: '#666' }} /> button in the upper right of
                            the sidebar.
                        </p>
                        <h4>Map tools:</h4>
                        <p>Hover over one of the tool buttons on the right side of the map for more information.</p>
                        <ul>
                            <li>
                                <b>Zoom to specific area:</b> enable this tool and then draw a box on the map to zoom
                                in.
                            </li>
                            <li>
                                <b>Search by location name:</b> click on this tool to enter a place name to search for.
                                It will show a marker on the map when you select a place from the list.
                            </li>
                            <li>
                                <b>Zoom to my location:</b> click on this tool to zoom the map to your current physical
                                location, using location services in your device. Your browser may prompt you for
                                permission.
                            </li>
                            <li>
                                <b>View pixel-level details:</b> enable this tool to view details at the pixel level for
                                the Blueprint (for advanced users). Details for the pixel under the crosshairs in the
                                center of the map will show in the sidebar, and will update as you pan or zoom the map.
                            </li>
                        </ul>
                    </React.Fragment>
                )}
            </section>

            <section>
                <h3>Credits</h3>

                <h4>Citation:</h4>
                <p>The South Atlantic Conservation Blueprint Version 2.2.</p>

                <h4>Application developed by:</h4>

                <div style={{ fontSize: 14, marginBottom: 20 }}>
                    <div>
                        <img
                            src="/consbio.png"
                            style={{ height: 26, padding: 8, verticalAlign: 'middle' }}
                            alt="CBI Logo"
                        />
                        <div className="inline-middle" style={{ minWidth: 230 }}>
                            <a href="https://consbio.org" target="_blank" rel="noopener noreferrer">
                                Conservation Biology Institute
                            </a>
                        </div>
                    </div>

                    <div>
                        <img
                            src="/logo_96x96.png"
                            style={{ height: 32, padding: 6, verticalAlign: 'middle' }}
                            alt="South Atlantic Logo"
                        />
                        <div className="inline-middle" style={{ minWidth: 230 }}>
                            <a href="http://www.southatlanticlcc.org/" target="_blank" rel="noopener noreferrer">
                                South Atlantic Conservation Blueprint
                            </a>
                        </div>
                    </div>
                </div>

                <p>
                    Land ownership and conservation status is derived from the Secured Lands Database from TNC Eastern
                    Division - 2015 Edition.
                </p>

                {isMobile && (
                    <React.Fragment>
                        <h4>Basemaps:</h4>
                        <p>
                            <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener noreferrer">
                                © Mapbox
                            </a>
                            <br />
                            <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
                                © OpenStreetMap
                            </a>
                            <br />
                            <a href="https://www.mapbox.com/map-feedback/" target="_blank" rel="noopener noreferrer">
                                Improve this map
                            </a>
                            <br />
                            <span className="text-small text-quiet">(note: applies to the basemap, not the Blueprint)</span>
                        </p>
                    </React.Fragment>
                )}
            </section>
        </div>
    )
}

InfoTab.propTypes = {
    isMobile: PropTypes.bool.isRequired
}
const mapStateToProps = ({ browser: { isMobile } }) => ({ isMobile })

export default connect(mapStateToProps)(InfoTab)
