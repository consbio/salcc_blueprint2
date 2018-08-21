import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import InfoTab from '../InfoTab'
import SelectedUnit from './SelectedUnit'
import PixelDetails from './PixelDetails'

const Sidebar = ({ selectedUnit, isPixelMode }) => {
    let content = null
    if (selectedUnit !== null) {
        content = <SelectedUnit />
    } else if (isPixelMode) {
        content = <PixelDetails />
    } else {
        content = (
            <div id="SidebarContent">
                <InfoTab />
            </div>
        )
    }

    return (
        <div id="Sidebar" className="flex-container-column">
            {content}
        </div>
    )
}

Sidebar.propTypes = {
    selectedUnit: PropTypes.string,
    isPixelMode: PropTypes.bool.isRequired
}

Sidebar.defaultProps = {
    selectedUnit: null
}

const mapStateToProps = ({ app: { selectedUnit, isPixelMode } }) => ({
    selectedUnit,
    isPixelMode
})

export default connect(
    mapStateToProps,
    null
)(Sidebar)
