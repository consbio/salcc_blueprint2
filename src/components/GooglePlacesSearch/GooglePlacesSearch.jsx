/* eslint-disable no-underscore-dangle */

/*
Google Places API-backed text input, with pending spinner and input clear button

Derived and substantially modified from: https://github.com/ubilabs/react-geosuggest
*/

import React from 'react'
import PropTypes from 'prop-types'

import debounce from 'lodash.debounce'

import Input from './Input'

import './GooglePlacesSearch.css'


class GooglePlacesSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isResultsHidden: true,
            isPending: false,
            value: '', // input value
            selected: null, // selected result, will have id, label, and location: {lat, long}
            results: []
        }

        this._getAutocomplete = debounce(this._getAutocomplete, 500)
    }

    componentWillMount() {
        if (typeof window === 'undefined') {
            return
        }

        // Initialize Google Place APIs
        const googleMaps = (window.google && window.google.maps) || this.googleMaps

        if (!googleMaps) {
            if (console) {
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
                    results: [],
                    isResultsHidden: false,
                    isPending: true
                },
                this._getAutocomplete
            )
        } else {
            this.setState({
                value,
                results: [],
                isResultsHidden: true,
                isPending: false
            })
        }
    }

    onInputFocus = () => {
        this.props.onFocus()
        this.setState({ focused: true, isResultsHidden: false })
    }

    onInputBlur = () => {
        this.timer = setTimeout(() => {
            this.setState({ isResultsHidden: true, isPending: false })
        }, 100)
    }

    blur() {
        if (this.input !== null) this.input.blur()
    }


    _getAutocomplete = () => {
        const options = {
            input: this.state.value
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
                this.setState({ isPending: false, results })
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

    _getResultLocation = () => {
        // Get geocoded result
        const result = this.state.selected
        this.geocoder.geocode({ placeId: result.id }, (results, status) => {
            if (status === this.googleMaps.GeocoderStatus.OK) {
                const { location } = results[0].geometry

                result.location = {
                    lat: location.lat(),
                    lng: location.lng()
                }
            }
            this.setState({ selected: result, isPending: false })
            this.props.onSelect(result)
        })
    }

    handleResultClick(result) {
        this.setState(
            {
                value: result.label,
                isResultsHidden: true,
                isPending: true,
                selected: result
            },
            this._getResultLocation
        )
    }

    renderResults = () => {
        if (this.state.isResultsHidden || this.state.isPending || !this.state.focused || !this.state.value) {
            return null
        } else if (this.state.results.length === 0) {
            return <div className="gplaces-search-noresults">No results found...</div>
        }

        const { value } = this.state

        return (
            <ul className="gplaces-search-results">
                {this.state.results.map((result) => {
                    const { label } = result
                    const offset = label.toLowerCase().indexOf(value.toLowerCase())
                    const handleClick = () => this.handleResultClick(result)

                    if (offset === -1) {
                        return (
                            <li key={label}>
                                <a href="#" onClick={handleClick}>
                                    {label}
                                </a>
                            </li>
                        )
                    }

                    const head = label.slice(0, offset)
                    const highlight = label.slice(offset, offset + value.length)
                    const tail = label.slice(offset + value.length)
                    return (
                        <li key={label}>
                            <a href="#" onClick={handleClick}>
                                {head}
                                <b>{highlight}</b>
                                {tail}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        const input = (
            <Input
                ref={(i) => {
                    this.input = i
                }}
                value={this.state.value}
                className="gplaces-search-input-container"
                isPending={this.state.isPending}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
            />
        )

        const resultsList = this.renderResults()

        return (
            <div className="gplaces-search">
                {input}
                {resultsList}
            </div>
        )
    }
}

GooglePlacesSearch.propTypes = {
    onFocus: PropTypes.func,
    // onBlur: PropTypes.func,
    onSelect: PropTypes.func,
    country: PropTypes.string
}

GooglePlacesSearch.defaultProps = {
    onFocus: () => {},
    // onBlur: () => {},
    onSelect: (result) => {
        console.log('selected result', result)
    },
    country: 'us'
}

export default GooglePlacesSearch
