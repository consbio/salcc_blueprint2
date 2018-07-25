import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import InfoTab from './InfoTab'
import Tabs, { getUnitTab } from './Tabs'
import ResetIcon from './icons/outline-cancel-24px.svg'
import DownloadIcon from './icons/outline-cloud_download-24px.svg'
import * as actions from '../Actions/actions'

const REPORT_SERVER = process.env.REPORT_SERVER || '/report'

const Sidebar = ({
    selectedUnit,
    activeTab,
    unitName,
    hasSelectedUnit,
    isDataLoaded,
    isMarine,
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
                                    <div id="ReportDownload">
                                        <a href={`${REPORT_SERVER}/${selectedUnit}`}>
                                            <DownloadIcon height={20} />
                                            download report
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <ResetIcon id="CloseButton" onClick={deselectUnit} />
                        </div>

                        <Tabs
                            hasSelectedUnit={hasSelectedUnit}
                            activeTab={activeTab}
                            setTab={setTab}
                            isMobile={false}
                            isMarine={isMarine}
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
    isMarine: PropTypes.bool.isRequired,

    deselectUnit: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired,

    selectedUnit: PropTypes.string,
    activeTab: PropTypes.string,
    acres: PropTypes.number
}

Sidebar.defaultProps = {
    selectedUnit: null,
    activeTab: null,
    acres: null
}

const mapStateToProps = ({
    app: {
        activeTab, selectedUnit, isDataLoaded, data
    }
}) => ({
    selectedUnit,
    activeTab,
    isDataLoaded,
    hasSelectedUnit: selectedUnit !== null,
    isMarine: !!(selectedUnit && selectedUnit.indexOf('M') === 0),
    unitName: isDataLoaded && data.name ? data.name : 'Loading...',
    acres: isDataLoaded ? data.acres : null
})

export default connect(
    mapStateToProps,
    actions
)(Sidebar)
