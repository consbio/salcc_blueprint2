import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import InfoTab from './InfoTab'
import Tabs, { getTab, getUnitTab } from './Tabs'
import * as actions from '../Actions/actions'

const Sidebar = ({
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
        <div id="Sidebar">
            {hasSelectedUnit ? (
                <React.Fragment>
                    <Tabs hasSelectedUnit={hasSelectedUnit} activeTab={activeTab} setTab={setTab} />
                    {activeTab && <div className="flex-container-column">{tab}</div>}
                </React.Fragment>
            ) : (
                <InfoTab />
            )}
        </div>
    )
}

Sidebar.propTypes = {
    hasSelectedUnit: PropTypes.bool.isRequired,
    isDataLoaded: PropTypes.bool.isRequired,
    setTab: PropTypes.func.isRequired,

    activeTab: PropTypes.string
}

Sidebar.defaultProps = {
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
)(Sidebar)
