import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tabs from './Tabs'
// import { UnitDataPropType } from '../CustomPropTypes'
import * as actions from '../Actions/actions'

const Sidebar = ({ activeTab, selectedUnit, setTab }) => {
    const hasSelectedUnit = selectedUnit !== null
    return (
        <div id="Sidebar">
            <Tabs hasSelectedUnit={hasSelectedUnit} activeTab={activeTab} setTab={setTab} />
        </div>
    )
}

Sidebar.propTypes = {
    setTab: PropTypes.func.isRequired,

    activeTab: PropTypes.string,
    selectedUnit: PropTypes.string
    // isPending: PropTypes.bool.isRequired,
    // hasError: PropTypes.bool.isRequired,
    // data: UnitDataPropType
}

Sidebar.defaultProps = {
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
)(Sidebar)
