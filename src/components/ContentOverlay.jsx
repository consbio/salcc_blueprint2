import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tabs from './Tabs'
import * as actions from '../Actions/actions'

const ContentOverlay = ({ activeTab, selectedUnit, setTab }) => {
    const hasSelectedUnit = selectedUnit !== null

    return (
        <React.Fragment>
            {activeTab && <div id="ContentOverlay">content goes here</div>}
            <footer>
                <Tabs hasSelectedUnit={hasSelectedUnit} activeTab={activeTab} setTab={setTab} toggleTabs />
            </footer>
        </React.Fragment>
    )
}

ContentOverlay.propTypes = {
    setTab: PropTypes.func.isRequired,

    activeTab: PropTypes.string,
    selectedUnit: PropTypes.string
    // isPending: PropTypes.bool.isRequired,
    // hasError: PropTypes.bool.isRequired,
    // data: UnitDataPropType
}

ContentOverlay.defaultProps = {
    activeTab: null,
    selectedUnit: null
    // data: null
}

const mapStateToProps = (state) => {
    const { app } = state
    return { ...app }
}

export default connect(
    mapStateToProps,
    actions
)(ContentOverlay)
