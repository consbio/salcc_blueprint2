/* eslint-disable no-underscore-dangle */

/*
Google Places API-backed text input, with pending spinner and input clear button

Derived and substantially modified from: https://github.com/ubilabs/react-geosuggest
*/

import React from 'react'
import PropTypes from 'prop-types'

import debounce from 'lodash.debounce'

import Input from './Input'
import PlacesList from './PlacesList'

import { PlacePropType, PlacesPropType } from '../../CustomPropTypes'

class GooglePlacesSearch extends React.Component {
    constructor(props) {
        super(props)

        const { place } = props

        this.state = {
            isPending: false,
            value: place && place.label ? place.label : '' // input value
        }

        this._getAutocomplete = debounce(this._getAutocomplete, 500)
    }

    componentDidMount() {
        if (typeof window === 'undefined') {
            return
        }

        // Initialize Google Place APIs
        const googleMaps = (window.google && window.google.maps) || this.googleMaps
        if (!googleMaps) {
            if (console) {
                /* eslint-disable-next-line no-console */
                console.error('Google map api was not found in the page.')
            }
            return
        }
        this.googleMaps = googleMaps
        this.autocompleteService = new googleMaps.places.AutocompleteService()
        this.geocoder = new googleMaps.Geocoder()
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    onInputChange = (value) => {
        if (value) {
            this.setState(
                {
                    value,
                    isPending: true
                },
                this._getAutocomplete
            )
        } else {
            this.setState({
                value,
                isPending: false
            })
            this.props.setPlaces([])
        }
    }

    _getAutocomplete = () => {
        const { value } = this.state
        if (!value) return

        const options = {
            input: value
        };
        ['location', 'radius', 'bounds', 'types'].forEach((option) => {
            if (this.props[option]) {
                options[option] = this.props[option]
            }
        })

        if (this.props.country) {
            options.componentRestrictions = {
                country: this.props.country
            }
        }

        this.setState({ isPending: true }, () => {
            this.autocompleteService.getPlacePredictions(options, (googleResults) => {
                const results = (googleResults || []).map(this._extractResultInfo)
                this.setState({ isPending: false })
                this.props.setPlaces(results)
            })
        })
    }

    // Parse google results for display
    _extractResultInfo = (result) => {
        if (result.description.toLowerCase() === this.state.value.toLowerCase()) {
            return { id: result.place_id, label: result.description }
        }

        // Remove country if United States, since target user are only in US
        const parts = result.description.split(', ')
        if (parts[parts.length - 1] === 'United States') {
            parts.pop()
        }

        return { id: result.place_id, label: parts.join(', ') }
    }

    _getResultLocation = (result) => {
        // Get geocoded result
        this.geocoder.geocode({ placeId: result.id }, (results, status) => {
            if (status === this.googleMaps.GeocoderStatus.OK) {
                const { location } = results[0].geometry

                result.location = {
                    lat: location.lat(),
                    lng: location.lng()
                }
            }
            this.setState({ isPending: false })
            this.props.setPlace(result)
        })
    }

    handleResultClick(result) {
        console.log('handleResultClicked', result)
        this._getResultLocation(result)
    }

    render() {
        const { value, isPending } = this.state
        const { places: results } = this.props
        console.log('render google search', value, results)
        return (
            <div className="gplaces-search flex-container-column">
                <Input
                    value={value}
                    isPending={isPending}
                    onChange={this.onInputChange}
                />
                <PlacesList
                    places={results}
                    highlightText={value}
                    isPending={isPending}
                    onSelect={result => this.handleResultClick(result)}
                />
            </div>
        )
    }
}

GooglePlacesSearch.propTypes = {
    setPlace: PropTypes.func.isRequired,
    setPlaces: PropTypes.func.isRequired,
    place: PlacePropType,
    places: PlacesPropType,
    country: PropTypes.string
}

GooglePlacesSearch.defaultProps = {
    place: null,
    places: [],
    country: 'us'
}

export default GooglePlacesSearch
