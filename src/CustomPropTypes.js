import PropTypes from 'prop-types'

export const IndicatorPropType = PropTypes.shape({
    mean: PropTypes.number.isRequired,
    percent: PropTypes.arrayOf(PropTypes.number).isRequired
})

export const EcosystemPropType = PropTypes.shape({
    indicators: PropTypes.objectOf(IndicatorPropType).isRequired,
    percent: PropTypes.number // not all ecosystems have a percent
})

export const UnitDataPropType = PropTypes.shape({
    SRCID: PropTypes.string.isRequired,
    acres: PropTypes.number.isRequired,
    blueprint: PropTypes.arrayOf(PropTypes.number).isRequired,
    ecosystems: PropTypes.objectOf(EcosystemPropType).isRequired,
    name: PropTypes.string.isRequired,

    // optional properties
    basin: PropTypes.string,
    counties: PropTypes.objectOf(PropTypes.string), // FIPS: County name, State
    justification: PropTypes.string,
    plants: PropTypes.arrayOf(PropTypes.string)
})

export default { UnitDataPropType }
