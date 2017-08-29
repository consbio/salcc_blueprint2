/*
Google Places API-backed text input, with pending spinner and input clear button

Derived and substantially modified from: https://github.com/ubilabs/react-geosuggest
*/


import React from 'react';
import './GooglePlacesSearch.css';
import debounce from 'lodash.debounce';
import Input from './Input';


class GooglePlacesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResultsHidden: true,
            isPending: false,
            value: '', // input value
            selected: null, // selected result, will have id, label, and location: {lat, long}
            results: []
        };

        this._getAutocomplete = debounce(this._getAutocomplete, 500);
    }

    componentWillMount() {
        if (typeof window === 'undefined') {
            return;
        }

        // Initialize Google Place APIs
        var googleMaps = this.props.googleMaps || (window.google && window.google.maps) || this.googleMaps;

        if (!googleMaps) {
            if (console) {
                console.error('Google map api was not found in the page.');
            }
            return;
        }
        this.googleMaps = googleMaps;

        this.autocompleteService = new googleMaps.places.AutocompleteService();
        this.geocoder = new googleMaps.Geocoder();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onInputChange = value => {
        if (!!value) {
            this.setState({value, results: [], isResultsHidden: false, isPending: true}, this._getAutocomplete);
        }
        else {
            this.setState({value, results: [], isResultsHidden: true, isPending: false});
        }
    };

    onInputFocus = () => {
        this.props.onFocus();
        this.setState({focused: true, isResultsHidden: false});
    };

    onInputBlur = () => {
        this.timer = setTimeout(() => {
            this.setState({isResultsHidden: true, isPending: false});
        }, 100);
    };

    _getAutocomplete = () => {
        const options = {
            input: this.state.value
        };

        ['location', 'radius', 'bounds', 'types'].forEach(option => {
            if (this.props[option]) {
                options[option] = this.props[option];
            }
        });

        if (this.props.country) {
            options.componentRestrictions = {
                country: this.props.country
            };
        }

        this.setState({isPending: true}, () => {
            this.autocompleteService.getPlacePredictions(
                options,
                googleResults => {
                    googleResults = googleResults || [];
                    let results = googleResults.map(this._extractResultInfo);
                    this.setState({isPending: false, results: results});
                }
            );
        });
    };

    // Parse google results for display
    _extractResultInfo = (result) => {
        if (result.description.toLowerCase() === this.state.value.toLowerCase()) {
            return {id: result.place_id, label: result.description};
        }

        // Remove country if United States, since target user are only in US
        let parts = result.description.split(', ');
        if (parts[parts.length - 1] === 'United States') {
            parts.pop();
        }

        return {id: result.place_id, label: parts.join(', ')}
    };

    _getResultLocation = () => {
        // Get geocoded result
        let result = this.state.selected;
        this.geocoder.geocode({placeId: result.id},
            (results, status) => {
                if (status === this.googleMaps.GeocoderStatus.OK) {
                    let location = results[0].geometry.location;

                    result.location = {
                        lat: location.lat(),
                        lng: location.lng()
                    };
                }
                this.setState({selected: result, isPending: false});
                this.props.onSelect(result);
            }
        );
    };

    handleResultClick(result) {
        this.setState(
            {value: result.label, isResultsHidden: true, isPending: true, selected: result},
            this._getResultLocation
        );
    }

    renderResults = () => {
        if (this.state.isResultsHidden || this.state.isPending || !this.state.focused || !this.state.value) {
            return null;
        } else if (this.state.results.length === 0) {
            return <div className='gplaces-search-noresults'>No results found...</div>
        }

        let value = this.state.value;

        return <ul className='gplaces-search-results'>

            {this.state.results.map((result, i) => {
                let label = result.label;
                let offset = label.toLowerCase().indexOf(value.toLowerCase());

                if (offset === -1) {
                    return <li
                        key={i}
                        onClick={(e) => this.handleResultClick(result)}>
                        {label}
                    </li>
                }

                let head = label.slice(0, offset);
                let highlight = label.slice(offset, offset + value.length);
                let tail = label.slice(offset + value.length);
                return <li
                    key={i}
                    onClick={(e) => this.handleResultClick(result)}>
                    {head}<b>{highlight}</b>{tail}
                </li>
            })}
        </ul>;
    };

    render() {
        const input = <Input ref={(i) => {this.input = i}}
                             value={this.state.value}
                             className='gplaces-search-input-container'
                             isPending={this.state.isPending}
                             onChange={this.onInputChange}
                             onFocus={this.onInputFocus}
                             onBlur={this.onInputBlur}/>,

            resultsList = this.renderResults();

        return <div className='gplaces-search'>
            {input}
            {resultsList}
        </div>;
    }
}

GooglePlacesSearch.defaultProps = {
    onFocus: () => {},
    onBlur: () => {},
    onSelect: (result) => {
        console.log('selected result', result);
    },
    country: 'us'
};


export default GooglePlacesSearch;