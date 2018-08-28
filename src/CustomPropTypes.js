import PropTypes from 'prop-types'

export const IndicatorPropType = PropTypes.shape({
    mean: PropTypes.number, // if a unit summary
    percent: PropTypes.arrayOf(PropTypes.number), // if a unit summary
    value: PropTypes.number // if a pixel value
})

export const EcosystemPropType = PropTypes.shape({
    indicators: PropTypes.objectOf(IndicatorPropType),
    percent: PropTypes.number // not all ecosystems have a percent
})

export const UnitDataPropType = PropTypes.shape({
    acres: PropTypes.number.isRequired,
    blueprint: PropTypes.arrayOf(PropTypes.number).isRequired,
    ecosystems: PropTypes.objectOf(EcosystemPropType).isRequired,
    name: PropTypes.string.isRequired,

    // optional properties
    plans: PropTypes.arrayOf(PropTypes.string),

    // only for watersheds
    SRCID: PropTypes.string,
    basin: PropTypes.string,
    counties: PropTypes.objectOf(PropTypes.string), // FIPS: County name, State
    justification: PropTypes.string
})

export const PlacePropType = PropTypes.shape({
    label: PropTypes.string,
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }).isRequired
})

export const PlacesPropType = PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })
)

export default {
    EcosystemPropType,
    IndicatorPropType,
    PlacePropType,
    UnitDataPropType
}
