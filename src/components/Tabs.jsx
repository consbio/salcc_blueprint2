import React from 'react'
import PropTypes from 'prop-types'

import TabIcons from './icons/TabIcons'

const TABS = ['Info', 'Find Location']
const UNIT_TABS = ['Priorities', 'Indicators', 'Partners'] // TODO: 'Threats'

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
