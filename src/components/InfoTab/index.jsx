import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PRIORITIES from '../../config/priorities.json'

const InfoTab = ({ isMobile }) => {
    const sortedPriorities = [4, 3, 2, 1] // 0 deliberately omitted

    const renderPriority = (priority) => {
        const {
            label, area, description, color, textColor
        } = PRIORITIES[priority]

        return (
            <div key={priority}>
                <div className="priorityColorPatch" style={{ backgroundColor: color, color: textColor }}>
                    <b>{label}</b>
                    <br />
                    <span className="text-small">{area} of South Atlantic</span>
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
                    The Conservation Blueprint is a living spatial plan to conserve natural and cultural resources for
                    future generations. It identifies priority areas for shared conservation action. Blueprint 2.2 is
                    completely data-driven, prioritizing the lands and waters of the South Atlantic region based on
                    ecosystem indicator models and a connectivity analysis. Better indicator condition suggests higher
                    ecosystem integrity and higher importance for natural and cultural resources across all ecosystems
                    collectively. So far, more than 500 people from 150 organizations actively participated in the
                    collaborative development of the Blueprint.
                </p>
                <p>
                    This <b>Simple Viewer</b> summarizes the Blueprint priorities and supporting information within
                    subwatersheds and marine lease blocks.
                    <br />
                    <a href="http://www.southatlanticlcc.org/blueprint/" target="_blank" rel="noopener noreferrer">
                        More information about the Blueprint.
                    </a>
                </p>
            </section>

            <section>
                <h3>Blueprint Priorities</h3>
                {sortedPriorities.map(renderPriority)}
            </section>

            <section>
                <h3>How To Use This Viewer</h3>
                {isMobile ? (
                    <p>TODO: Mobile specific instructions go here!</p>
                ) : (
                    <p>TODO: Desktop specific instructions go here!</p>
                )}
                {/* <p>
                    Once you have zoomed in far enough, the map will show boundaries of areas that you can select for
                    more information. Tap or click on an area to show details. Clear the selected area by tapping or
                    clicking that area again, or tap the close button in the upper right.
                    <br />
                    <br />
                    Use the tabs at the bottom of the screen to navigate the different types of summary information
                    available.
                    <br />
                    <br />
                    On the Indicators tab, you can swipe or click between ecosystems to see the average value for each
                    indicator present in that area.
                    <br />
                    <br />
                    Tap or click on an indicator to see more details.
                </p> */}
            </section>

            <section>
                <h3>You can help improve the Blueprint</h3>
                <p>
                    Give us your feedback:
                    <br />
                    email <a href="mailto:southatlanticlcc@gmail.com">southatlanticlcc@gmail.com</a>
                    <br />
                    <br />
                    or call Hilary Morris (Blueprint User Support):
                    <br />
                    <a href="tel:19197070252">(919) 707-0252</a>
                </p>
            </section>

            <section>
                <h3>Credits</h3>
                <h4>Application developed by:</h4>

                <div style={{ fontSize: 14, marginBottom: 20 }}>
                    <div>
                        <img
                            src="/consbio.png"
                            style={{ height: 26, padding: 8, verticalAlign: 'middle' }}
                            alt="CBI Logo"
                        />
                        <div className="inline-middle" style={{ width: 250 }}>
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
                        <div className="inline-middle" style={{ width: 250 }}>
                            <a href="http://www.southatlanticlcc.org/" target="_blank" rel="noopener noreferrer">
                                South Atlantic Conservation Blueprint
                            </a>
                        </div>
                    </div>
                </div>

                <h4>Citation:</h4>
                <p>The South Atlantic Conservation Blueprint Version 2.2.</p>

                <h4>Land ownership and conservation status:</h4>
                <p>Secured Lands Database from TNC Eastern Division - 2015 Edition.</p>

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
            </section>
        </div>
    )
}

InfoTab.propTypes = {
    isMobile: PropTypes.bool.isRequired
}
const mapStateToProps = ({ browser: { isMobile } }) => ({ isMobile })

export default connect(mapStateToProps)(InfoTab)
