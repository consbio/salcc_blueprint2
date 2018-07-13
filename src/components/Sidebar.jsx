import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import InfoTab from './InfoTab'
import Tabs, { getUnitTab } from './Tabs'
import ResetIcon from './icons/ResetIcon'
import * as actions from '../Actions/actions'

const Sidebar = ({
    activeTab,
    unitName,
    hasSelectedUnit,
    isDataLoaded,
    acres,
    deselectUnit,
    setTab
}) => {
    let tab = null
    if (hasSelectedUnit) {
        if (isDataLoaded) {
            tab = getUnitTab(activeTab)
        } // TODO: else show loading spinner on delay?
    }

    return (
        <div id="Sidebar" className="flex-container-column">
            {hasSelectedUnit ? (
                <React.Fragment>
                    <div id="SidebarHeader">
                        <div id="SidebarHeaderInner" className="flex-container flex-justify-center flex-align-start">
                            <div className="flex-grow">
                                <h3>{unitName}</h3>
                                <div className="text-quiet text-smaller">
                                    {acres && <div>{acres.toLocaleString()} acres</div>}
                                    <a href="">download report</a>
                                </div>
                            </div>
                            <ResetIcon id="CloseButton" onClick={deselectUnit} />
                        </div>

                        <Tabs
                            hasSelectedUnit={hasSelectedUnit}
                            activeTab={activeTab}
                            setTab={setTab}
                            isMobile={false}
                        />
                    </div>
                    {activeTab && (
                        <div id="SidebarContent" className="flex-container-column">
                            {tab}
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <div id="SidebarContent">
                    <InfoTab />
                </div>
            )}
        </div>
    )
}

Sidebar.propTypes = {
    unitName: PropTypes.string.isRequired,
    hasSelectedUnit: PropTypes.bool.isRequired,
    isDataLoaded: PropTypes.bool.isRequired,

    deselectUnit: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired,

    activeTab: PropTypes.string,
    acres: PropTypes.number
}

Sidebar.defaultProps = {
    activeTab: null,
    acres: null
}

const mapStateToProps = ({
    app: {
        activeTab, selectedUnit, isDataLoaded, data
    }
}) => ({
    activeTab,
    isDataLoaded,
    hasSelectedUnit: selectedUnit !== null,
    unitName: isDataLoaded && data.name ? data.name : 'Loading...',
    acres: isDataLoaded ? data.acres : null
})

export default connect(
    mapStateToProps,
    actions
)(Sidebar)
