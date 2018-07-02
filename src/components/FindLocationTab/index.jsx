import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../../Actions/actions'
import { PlacePropType, PlacesPropType } from '../../CustomPropTypes'

import GooglePlacesSearch from '../GooglePlacesSearch'

const FindLocationTab = ({
    place, places, setPlace, setPlaces
}) => (
    <div id="Content">
        <h3>Find a location on the map</h3>
        <GooglePlacesSearch place={place} places={places} setPlace={setPlace} setPlaces={setPlaces} />
    </div>
)

FindLocationTab.propTypes = {
    setPlace: PropTypes.func.isRequired,
    setPlaces: PropTypes.func.isRequired,
    place: PlacePropType,
    places: PlacesPropType
}

FindLocationTab.defaultProps = {
    place: null,
    places: []
}

const mapStateToProps = ({ app: { place, places } }) => ({ place, places })

export default connect(
    mapStateToProps,
    actions
)(FindLocationTab)
