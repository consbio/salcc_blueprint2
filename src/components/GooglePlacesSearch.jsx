import React from 'react';
import './GooglePlacesSearch.css';
// import classnames from 'classnames';
import debounce from 'lodash.debounce';

import Input from './Input';
import ResultsList from './ResultsList';


class GooglePlacesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResultsHidden: true,
            isPending: false,
            value: '', // input value
            selected: null, // selected result
            results: []
        };

        this.getAutocomplete = debounce(this.getAutocomplete, 500);
    }

    onInputChange = value => {
        this.setState(
            {value, isResultsHidden: !!!value, isPending: !!value},
            this.getAutocomplete
        );
    }


    getAutocomplete = () => {
        console.log('get autocomplete');

        if (!!!this.state.value) {
            console.log('empty string')
            this.setState({results: [], isPending: false});
            return;
        }

        // this.setState({
        //     results: [
        //         {label: this.state.value + 'more substring', offset: 0, length: this.state.value.length, lat: 0, long: 0},
        //         {label: 'not ' + this.state.value + ' foo', offset: 4, length: this.state.value.length, lat: 0, long: 0},
        //     ],
        //     isPending: false
        // });


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
              console.log(googleResults)

                let results = googleResults.map(r => {
                    return {
                        id: r.id,
                        label: r.description,
                        length: r.matched_substrings[0].length,
                        offset: r.matched_substrings[0].offset
                    };
                });
              this.setState({isPending: false, results: results});
            }
          );
        });
    }

    componentWillMount() {
        if (typeof window === 'undefined') {
            return;
        }

        var googleMaps = this.props.googleMaps ||
            (window.google && // eslint-disable-line no-extra-parens
            window.google.maps) ||
            this.googleMaps;

        /* istanbul ignore next */
        if (!googleMaps) {
            if (console) {
                console.error(// eslint-disable-line no-console
                    'Google map api was not found in the page.');
            }
            return;
        }
        this.googleMaps = googleMaps;

        this.autocompleteService = new googleMaps.places.AutocompleteService();
        this.geocoder = new googleMaps.Geocoder();
    }

    /**
     * When the component will unmount
     */
    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    // onInputChange = userInput => {
    //     this.setState({userInput}, this.onAfterInputChange);
    // };

    // onAfterInputChange = () => {
    //     if (!this.state.isResultsHidden) {
    //         this.showSuggests();
    //     }
    //     this.props.onChange(this.state.userInput);
    // };

    onInputFocus = () => {
        this.props.onFocus();
        this.showSuggests();
        this.setState({focused: true});
    };

    onInputBlur = () => {
        console.log('input blur')
        this.hideSuggests();
        // this.setState({isResultsHidden: true, focused: false});
    };

    onNext = () => this.activateSuggest('next');

    onPrev = () => this.activateSuggest('prev');

    onSelect = () => this.selectSuggest(this.state.activeSuggest);

    onSuggestMouseDown = () => this.setState({ignoreBlur: true});

    onSuggestMouseOut = () => this.setState({ignoreBlur: false});

    onSuggestNoResults = () => {
        console.log('no results')
        // this.props.onSuggestNoResults(this.state.userInput);
    };


    // Public methods
    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    update(userInput) {
        this.setState({userInput});
        this.props.onChange(userInput);
    }

    clear() {
        this.setState({userInput: ''}, this.hideSuggests);
    }


    searchSuggests() {
        console.log(this.state.userInput)

        if (this.state.userInput == null) return;
        // console.log('search Suggests', this.state.userInput)
        // if (!this.state.userInput) {
        //     // this.updateSuggests();
        //     return;
        // }

        // console.log('userInput:', typeof this.state.userInput);

        // TODO: this is a faked out function to generate results
        var results = []
        for (let i = 0; i < this.state.userInput.length; i++) {
            let char = this.state.userInput[i];
            if (char.trim()) results.push(char);
        }

        this.setState({results: results});

        // const options = {
        //     input: this.state.userInput
        // };
        //
        // ['location', 'radius', 'bounds', 'types'].forEach(option => {
        //   if (this.props[option]) {
        //     options[option] = this.props[option];
        //   }
        // });
        //
        // if (this.props.country) {
        //   options.componentRestrictions = {
        //     country: this.props.country
        //   };
        // }
        //
        // this.setState({isLoading: true}, () => {
        //   this.autocompleteService.getPlacePredictions(
        //     options,
        //     suggestsGoogle => {
        //       this.setState({isLoading: false});
        //       this.updateSuggests(suggestsGoogle || [], // can be null
        //         () => {
        //           if (this.props.autoActivateFirstSuggest &&
        //             !this.state.activeSuggest
        //           ) {
        //             this.activateSuggest('next');
        //           }
        //         });
        //     }
        //   );
        // });
    }


    updateSuggests(suggestsGoogle = [], callback) {
        console.log('update suggests', suggestsGoogle, callback)


        // var suggests = [],
        //   userInput = this.state.userInput,
        //   regex = new RegExp(escapeRegExp(userInput), 'gim'),
        //   skipSuggest = this.props.skipSuggest,
        //   maxFixtures = this.props.maxFixtures,
        //   fixturesSearched = 0,
        //   activeSuggest = null;
        //
        // this.props.fixtures.forEach(suggest => {
        //   if (fixturesSearched >= maxFixtures) {
        //     return;
        //   }
        //
        //   if (!skipSuggest(suggest) && suggest.label.match(regex)) {
        //     fixturesSearched++;
        //
        //     suggest.placeId = suggest.label;
        //     suggest.isFixture = true;
        //     suggest.matchedSubstrings = {
        //       offset: suggest.label.indexOf(userInput),
        //       length: userInput.length
        //     };
        //     suggests.push(suggest);
        //   }
        // });
        //
        // suggestsGoogle.forEach(suggest => {
        //   if (!skipSuggest(suggest)) {
        //     suggests.push({
        //       description: suggest.description,
        //       label: this.props.getSuggestLabel(suggest),
        //       placeId: suggest.place_id,
        //       isFixture: false,
        //       matchedSubstrings: suggest.matched_substrings[0]
        //     });
        //   }
        // });
        //
        // activeSuggest = this.updateActiveSuggest(suggests);
        // this.setState({suggests, activeSuggest}, callback);
    }


    updateActiveSuggest(suggests = []) {
        // console.log('update active suggests')
        let activeSuggest = this.state.activeSuggest;

        // if (activeSuggest) {
        //   const newSuggest = suggests.filter(listedSuggest =>
        //     activeSuggest.placeId === listedSuggest.placeId &&
        //     activeSuggest.isFixture === listedSuggest.isFixture
        //   )[0];
        //
        //   activeSuggest = newSuggest || null;
        // }

        return activeSuggest;
    }


    showSuggests() {
        // console.log('show suggests')
        this.searchSuggests();
        this.setState({isResultsHidden: false});
        // console.log('genames state', this.state)
    }

    /**
     * Hide the suggestions
     */
    hideSuggests = () => {
        console.log('hide suggests')
        // this.props.onBlur(this.state.userInput);
        this.timer = setTimeout(() => {
            console.log('after timeout, hidding')
            this.setState({
                isResultsHidden: true,
                // activeSuggest: null
            });
        }, 100);
    };

    /**
     * Activate a new suggest
     * @param {String} direction The direction in which to activate new suggest
     */
    activateSuggest(direction) { // eslint-disable-line complexity
        if (this.state.isResultsHidden) {
            this.showSuggests();
            return;
        }

        const suggestsCount = this.state.results.length - 1,
            next = direction === 'next';
        let newActiveSuggest = null,
            newIndex = 0,
            i = 0;

        for (i; i <= suggestsCount; i++) {
            if (this.state.results[i] === this.state.activeSuggest) {
                newIndex = next ? i + 1 : i - 1;
            }
        }

        if (!this.state.activeSuggest) {
            newIndex = next ? 0 : suggestsCount;
        }

        if (newIndex >= 0 && newIndex <= suggestsCount) {
            newActiveSuggest = this.state.results[newIndex];
        }

        this.props.onActivateSuggest(newActiveSuggest);

        this.setState({activeSuggest: newActiveSuggest});
    }

    /**
     * When an item got selected
     * @param {GeosuggestItem} suggest The selected suggest item
     */
    selectSuggest = suggest => {
        if (!suggest) {
            suggest = {
                label: this.state.userInput
            };
        }

        this.setState({
            isResultsHidden: true,
            userInput: typeof suggest.label !== 'object' ?
                suggest.label :
                suggest.description
        });

        if (suggest.location) {
            this.setState({ignoreBlur: false});
            this.props.onSuggestSelect(suggest);
            return;
        }

        this.geocodeSuggest(suggest);
    };

    /**
     * Geocode a suggest
     * @param  {Object} suggest The suggest
     */
    geocodeSuggest(suggest) {
        console.log('geocode')
        // this.geocoder.geocode(
        //   suggest.placeId && !suggest.isFixture ?
        //     {placeId: suggest.placeId} : {address: suggest.label},
        //   (results, status) => {
        //     if (status === this.googleMaps.GeocoderStatus.OK) {
        //       var gmaps = results[0],
        //         location = gmaps.geometry.location;
        //
        //       suggest.gmaps = gmaps;
        //       suggest.location = {
        //         lat: location.lat(),
        //         lng: location.lng()
        //       };
        //     }
        //     this.props.onSuggestSelect(suggest);
        //   }
        // );
    }


    handleResultClick(result)  {
        console.log('handleResultClick', result);
        this.setState({value: result.label, isResultsHidden: true, selected: result});
        this.props.onSelect(result);// TODO: as a callback above?
    }


    getResultsDisplay = () => {
        if (this.state.isResultsHidden || this.state.isPending || !this.state.focused || !!!this.state.value) {
            return null;
        } else
            if (this.state.results.length === 0) {
            return <div className='gplaces-search-noresults'>No results found...</div>
        }

        return <ul className='gplaces-search-results'>

            {this.state.results.map((result, i) => {
                let head = result.label.slice(0, result.offset);
                let highlight = result.label.slice(result.offset, result.offset + result.length);
                let tail = result.label.slice(result.offset + result.length);
                return <li
                    key={i}
                    onClick={(e) => this.handleResultClick(result)}>
                    {head}<b>{highlight}</b>{tail}
                </li>
            })}
        </ul>;
    }


    render() {
        console.log('render gplaces')
        const input = <Input ref={(i) => {
                this.input = i
            }}
                             value={this.state.value}
                             className='gplaces-search-input-container'
                             isPending={this.state.isPending}
                             onChange={this.onInputChange}
                             onFocus={this.onInputFocus}
                             onBlur={this.onInputBlur} />,

            resultsList = this.getResultsDisplay();

        return <div className='gplaces-search'>
            {input}
            {resultsList}
        </div>;
    }
}

GooglePlacesSearch.defaultProps = {
    onFocus: () => {},
    onBlur: () => {},
    onSelect: () => {},
    country: 'us'
}


export default GooglePlacesSearch;