import React from 'react';
// import classnames from 'classnames';
// import SuggestItem from './suggest-item';


// TODO: make sure props are immutable
export default class ResultsList extends React.PureComponent {
    isHidden() {
        // console.log('results', this.props.results)
        return this.props.isHidden || this.props.results.length === 0;
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('will receive new props')
    //     if (nextProps.results !== this.props.results) {
    //         if (nextProps.results.length === 0) {
    //             this.props.onSuggestNoResults();
    //         }
    //     }
    // }

    render() {
        // const classes = classnames(
        //     'geonames__results',
        //     this.props.resultsClassName,
        //     {'geonames__results--hidden': this.isHidden()},
        //     {
        //         [this.props.hiddenClassName]: this.props.hiddenClassName ?
        //             this.isHidden() : null
        //     }
        // );
        // console.log('is hidden?', this.isHidden())

        // TODO: set key properly
        // className={classes} style={this.props.style}
        return <ul className={this.props.className}>

            {this.props.results.map((result, i) => {
                // const isActive = this.props.activeSuggest &&
                //         suggest.placeId === this.props.activeSuggest.placeId,
                //     key = suggest.key || suggest.placeId;
                // return <SuggestItem key={key}
                //                     className={suggest.className}
                //                     userInput={this.props.userInput}
                //                     isHighlightMatch={this.props.isHighlightMatch}
                //                     suggest={suggest}
                //                     style={this.props.suggestItemStyle}
                //                     suggestItemClassName={this.props.suggestItemClassName}
                //                     isActive={isActive}
                //                     activeClassname={this.props.suggestItemActiveClassName}
                //                     onMouseDown={this.props.onSuggestMouseDown}
                //                     onMouseOut={this.props.onSuggestMouseOut}
                //                     onSelect={this.props.onresultselect}
                //                     renderSuggestItem={this.props.renderSuggestItem}/>;

                return <li key={i}>{result}</li>
            })}
        </ul>;
    }
}

ResultsList.defaultProps = {
    className: '',
    isHidden: true,
    results: []
};