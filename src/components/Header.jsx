import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../Actions/actions'
import ResetIcon from './icons/ResetIcon'

const Header = ({
    isMobile, hasSelectedUnit, unitName, deselectUnit, setTab
}) => {
    const showUnit = isMobile && hasSelectedUnit

    const handleDeselectUnit = () => {
        setTab(null)
        deselectUnit()
    }

    return (
        <header className="flex-container flex-justify-center flex-align-center">
            {showUnit ? (
                <React.Fragment>
                    <h1 className="flex-grow">{unitName}</h1>
                    <ResetIcon id="CloseButton" onClick={handleDeselectUnit} />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <img src="/logo_96x96.png" alt="SALCC Logo" />
                    <div className="flex-grow">
                        {isMobile && <h4>South Atlantic</h4>}
                        <h1>{`${!isMobile ? 'South Atlantic ' : ''}Conservation Blueprint 2.2`}</h1>
                    </div>
                </React.Fragment>
            )}
        </header>
    )
}

Header.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    hasSelectedUnit: PropTypes.bool.isRequired,
    unitName: PropTypes.string.isRequired,
    deselectUnit: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired
}

const mapStateToProps = ({ app, browser: { isMobile } }) => {
    const {
        selectedUnit, setTab, data, deselectUnit
    } = app
    return {
        isMobile,
        hasSelectedUnit: selectedUnit !== null,
        unitName: data && data.name ? data.name : 'Loading...',
        deselectUnit,
        setTab
    }
}

export default connect(
    mapStateToProps,
    actions
)(Header)
