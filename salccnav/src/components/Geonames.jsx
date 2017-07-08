import React from 'react';
import './Geonames.css';
// import classnames from 'classnames';
// import debounce from 'lodash.debounce';

import Input from './Input';
import ResultsList from './ResultsList';


// Escapes special characters in user input for regex
// function escapeRegExp(str) {
//   return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
// }


class Geonames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResultsHidden: true,
            isLoading: false,
            userInput: props.initialValue,
            activeSuggest: null,
            results: []
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onAfterInputChange = this.onAfterInputChange.bind(this);

        // if (props.queryDelay) {
        //   this.onAfterInputChange =
        //     debounce(this.onAfterInputChange, props.queryDelay);
        // }
    }

    /**
     * Change inputValue if prop changes
     * @param {Object} props The new props
     */
    componentWillReceiveProps(props) {
        if (this.props.initialValue !== props.initialValue) {
            this.setState({userInput: props.initialValue});
        }
    }

    // /**
    //  * Called on the client side after component is mounted.
    //  */
    // componentWillMount() {
    //   if (typeof window === 'undefined') {
    //     return;
    //   }
    //
    //   var googleMaps = this.props.googleMaps ||
    //     (window.google && // eslint-disable-line no-extra-parens
    //       window.google.maps) ||
    //     this.googleMaps;
    //
    //   /* istanbul ignore next */
    //   if (!googleMaps) {
    //     if (console) {
    //       console.error(// eslint-disable-line no-console
    //         'Google map api was not found in the page.');
    //     }
    //     return;
    //   }
    //   this.googleMaps = googleMaps;
    //
    //   this.autocompleteService = new googleMaps.places.AutocompleteService();
    //   this.geocoder = new googleMaps.Geocoder();
    // }

    /**
     * When the component will unmount
     */
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    /**
     * When the input changed
     * @param {String} userInput The input value of the user
     */
    onInputChange = userInput => {
        this.setState({userInput}, this.onAfterInputChange);
    };

    /**
     * On After the input got changed
     */
    onAfterInputChange = () => {
        if (!this.state.isResultsHidden) {
            this.showSuggests();
        }
        this.props.onChange(this.state.userInput);
    };

    /**
     * When the input gets focused
     */
    onInputFocus = () => {
        this.props.onFocus();
        this.showSuggests();
    };

    /**
     * When the input gets blurred
     */
    onInputBlur = () => {
        if (!this.state.ignoreBlur) {
            this.hideSuggests();
        }
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

    /**
     * Focus the input
     */
    focus() {
        this.input.focus();
    }

    /**
     * Blur the input
     */
    blur() {
        this.input.blur();
    }

    /**
     * Update the value of the user input
     * @param {String} userInput the new value of the user input
     */
    update(userInput) {
        this.setState({userInput});
        this.props.onChange(userInput);
    }

    /*
     * Clear the input and close the suggestion pane
     */
    clear() {
        this.setState({userInput: ''}, this.hideSuggests);
    }

    /**
     * Search for new suggests
     */
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
        for (let i=0; i<this.state.userInput.length; i++){
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

    /**
     * Update the suggests
     * @param {Array} suggestsGoogle The new google suggests
     * @param {Function} callback Called once the state has been updated
     */
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

    /**
     * Return the new activeSuggest object after suggests have been updated
     * @param {Array} suggests The new list of suggests
     * @return {Object} The new activeSuggest
     **/
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

    /**
     * Show the suggestions
     */
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
        // console.log('hide suggests')
        this.props.onBlur(this.state.userInput);
        this.timer = setTimeout(() => {
            this.setState({
                isResultsHidden: true,
                activeSuggest: null
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

    render() {
        const input = <Input className={this.props.inputClassName}
                             ref={i => this.input = i}
                             value={this.state.userInput}
                             ignoreEnter={!this.state.isResultsHidden}
                             ignoreTab={this.props.ignoreTab}
                             onChange={this.onInputChange}
                             onFocus={this.onInputFocus}
                             onBlur={this.onInputBlur}
                             onKeyDown={this.props.onKeyDown}
                             onKeyPress={this.props.onKeyPress}
                             onNext={this.onNext}
                             onPrev={this.onPrev}
                             onSelect={this.onSelect}
                             onEscape={this.hideSuggests}/>,
            resultsList = <ResultsList isHidden={this.state.isResultsHidden}
                                       userInput={this.state.userInput}
                                       results={this.state.results}
                                       onSuggestNoResults={this.onSuggestNoResults}
                                       onSuggestMouseDown={this.onSuggestMouseDown}
                                       onSuggestMouseOut={this.onSuggestMouseOut}
                                       onSuggestSelect={this.selectSuggest}/>;

        return <div className="geonames__container">
            <div className="geonames__input-wrapper">
                <div className="search-icon"></div>
                {input}
            </div>
            <div className="geonames__results-wrapper">
                {resultsList}
            </div>
        </div>;
    }
}

Geonames.defaultProps = {
    onFocus: () => {
    },
    onBlur: () => {
    },
    onChange: () => {
    },
}


export default Geonames;