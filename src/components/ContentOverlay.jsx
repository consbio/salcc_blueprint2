import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tabs, { getTab, getUnitTab } from './Tabs'
import * as actions from '../Actions/actions'

// renderActiveTab() {
//     const {
//         data, isPending, selectedUnit, activeTab, isMobile
//     } = this.props

//     if (isPending) return null

//     if (activeTab === 'Info') return <InfoTab />

//     if (data === null) {
//         if (isMobile) return null

//         // if there is no data, show the InfoTab if wide enough
//         if (selectedUnit === null) {
//             return <InfoTab />
//         }
//     }

//     const {
//         ecosystems, blueprint, justification, plans, gap, owner, counties
//     } = data

//     const isMarine = selectedUnit.indexOf('M') === 0

//     // if the previous state is the same tab, then close the tab
//     switch (activeTab) {
//         case 'Priorities':
//             return <PrioritiesTab blueprint={blueprint} justification={justification} plans={plans} />
//         case 'Indicators':
//             return <IndicatorsTab ecosystems={ecosystems} />
//         // case 'Threats':
//         //     return <ThreatsTab  {...this.props}/>;
//         case 'Partners':
//             return <PartnersTab counties={counties} gap={gap} owner={owner} isMarine={isMarine} />
//     }
//     return null
// }

const ContentOverlay = ({
    activeTab, selectedUnit, isDataLoaded, setTab
}) => {
    const hasSelectedUnit = selectedUnit !== null
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
            {activeTab && (
                <div id="ContentOverlay" className="flex-container-column">
                    {tab}
                </div>
            )}

            <footer>
                <Tabs hasSelectedUnit={hasSelectedUnit} activeTab={activeTab} setTab={setTab} toggleTabs />
            </footer>
        </React.Fragment>
    )
}

ContentOverlay.propTypes = {
    setTab: PropTypes.func.isRequired,
    activeTab: PropTypes.string,
    selectedUnit: PropTypes.string,
    isDataLoaded: PropTypes.bool.isRequired
}

ContentOverlay.defaultProps = {
    activeTab: null,
    selectedUnit: null
}

const mapStateToProps = ({ app }) => {
    const {
        activeTab, selectedUnit, isDataLoaded, setTab
    } = app
    return {
        activeTab,
        selectedUnit,
        isDataLoaded,
        setTab
    }
}

export default connect(
    mapStateToProps,
    actions
)(ContentOverlay)
