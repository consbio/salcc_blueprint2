import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tabs, { getTab, getUnitTab } from './Tabs'
import * as actions from '../Actions/actions'

/**
 * Component that renders the active tab content in mobile viewport
 */
const ContentOverlay = ({
    activeTab, hasSelectedUnit, isDataLoaded, setTab
}) => {
    let tab = null
    if (hasSelectedUnit) {
        if (isDataLoaded) {
            tab = getUnitTab(activeTab)
        } // TODO: else show loading spinner on delay?
    } else {
        tab = getTab(activeTab)
    }

    return (
        <React.Fragment>
            {activeTab && activeTab !== 'Map' && (
                <div id="ContentOverlay" className="flex-container-column">
                    {tab}
                </div>
            )}

            <footer className={hasSelectedUnit ? 'has-selected-unit' : ''}>
                <Tabs hasSelectedUnit={hasSelectedUnit} activeTab={activeTab} setTab={setTab} isMobile />
            </footer>
        </React.Fragment>
    )
}

ContentOverlay.propTypes = {
    setTab: PropTypes.func.isRequired,
    hasSelectedUnit: PropTypes.bool.isRequired,
    isDataLoaded: PropTypes.bool.isRequired,

    activeTab: PropTypes.string
}

ContentOverlay.defaultProps = {
    activeTab: null
}

const mapStateToProps = ({
    app: {
        activeTab, selectedUnit, isDataLoaded, setTab
    }
}) => ({
    activeTab,
    hasSelectedUnit: selectedUnit !== null,
    isDataLoaded,
    setTab
})

export default connect(
    mapStateToProps,
    actions
)(ContentOverlay)
