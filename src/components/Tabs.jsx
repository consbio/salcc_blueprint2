import React from 'react'
import PropTypes from 'prop-types'

import PrioritiesTab from './PrioritiesTab'
import IndicatorsTab from './IndicatorsTab'
import ThreatsTab from './ThreatsTab'
import PartnersTab from './PartnersTab'

import InfoTab from './InfoTab'
import FindLocationTab from './FindLocationTab'
import TabIcons from './icons/TabIcons'

const TABS = ['Info', 'Find Location'] // TODO: 'Map'
const UNIT_TABS = ['Priorities', 'Indicators', 'Partners'] // TODO: 'Threats'

/**
 * Get a tab component based on it's ID
 * @param {string} tab - ID of the tab
 */
export const getTab = (tab) => {
    switch (tab) {
        case 'Info':
            return <InfoTab />
        case 'Find Location':
            return <FindLocationTab />
        default:
            return null
    }
}

/**
 * Get a tab component that requires unit data to be loaded first
 * @param {string} tab - ID of the tab
 */
export const getUnitTab = (tab) => {
    switch (tab) {
        case 'Priorities':
            return <PrioritiesTab />
        case 'Indicators':
            return <IndicatorsTab />
        case 'Threats':
            return <ThreatsTab />
        case 'Partners':
            return <PartnersTab />
        default:
            return null
    }
}

const Tabs = ({
    activeTab, hasSelectedUnit, toggleTabs, setTab
}) => {
    const tabs = hasSelectedUnit ? UNIT_TABS : TABS

    const handleSetTab = (tab) => {
        // toggle current tab
        if (activeTab === tab && toggleTabs) {
            setTab(null)
        } else {
            setTab(tab)
        }
    }

    return (
        <nav className="tabs flex-container flex-justify-center">
            {tabs.map((tab) => {
                const isActive = activeTab === tab ? 'active' : ''
                const className = `tab ${isActive} tab-${tab.toLowerCase().replace(/ /g, '')}`
                const handleClick = () => handleSetTab(tab)

                return (
                    <div key={tab} className={className} onClick={handleClick}>
                        <TabIcons icon={tab} height={24} />
                        <label>{tab}</label>
                    </div>
                )
            })}
        </nav>
    )
}

Tabs.propTypes = {
    hasSelectedUnit: PropTypes.bool.isRequired,
    setTab: PropTypes.func.isRequired,

    activeTab: PropTypes.string,
    toggleTabs: PropTypes.bool
}

Tabs.defaultProps = {
    activeTab: null,
    toggleTabs: false
}

export default Tabs
