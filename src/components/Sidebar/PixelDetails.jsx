import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import ResetIcon from '../icons/outline-cancel-24px.svg'
import * as actions from '../../Actions/actions'

const PixelDetails = ({ location, values }) => {
    if (location === null) {
        return <div>Loading...</div>
    }

    const { latitude, longitude } = location
    return (
        <div>
            lat: {latitude}, long: {longitude}
            {Object.entries(values).map(([k, v]) => (
                <div key={`${k}_${v}`}>
                    {k}: {v}
                </div>
            ))}
        </div>
    )
}

PixelDetails.propTypes = {
    location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    }),
    values: PropTypes.object
}

PixelDetails.defaultProps = {
    location: null,
    values: null // for nodata pixels
}

const mapStateToProps = ({ app: { pixelLocation, pixelValues } }) => ({ location: pixelLocation, values: pixelValues })

export default connect(
    mapStateToProps,
    actions
)(PixelDetails)
