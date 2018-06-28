import React from 'react'
import PropTypes from 'prop-types'

import ResetIcon from './icons/ResetIcon'

const Header = ({
    isMobile, hasSelectedUnit, unitName, onClose
}) => {
    const siteName = `${!isMobile ? 'South Atlantic ' : ''}Conservation Blueprint 2.2`
    const showUnit = isMobile && hasSelectedUnit
    const header = showUnit ? unitName : siteName

    return (
        <header className="flex-container flex-justify-center flex-align-center">
            {!showUnit && <img src="/logo_96x96.png" alt="SALCC Logo" />}

            <h1>{header}</h1>

            {showUnit && <ResetIcon id="CloseButton" onClick={onClose} />}
        </header>
    )
}

Header.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    hasSelectedUnit: PropTypes.bool.isRequired,
    unitName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Header
