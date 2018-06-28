import React from 'react'
import PropTypes from 'prop-types'

const LTALink = ({ fips, countyName }) => (
    <li>
        <a href={`http://findalandtrust.org/counties/${fips}`} target="_blank" rel="noopener noreferrer">
            {countyName}
        </a>
    </li>
)

LTALink.propTypes = {
    fips: PropTypes.string.isRequired,
    countyName: PropTypes.string.isRequired
}

export default LTALink
