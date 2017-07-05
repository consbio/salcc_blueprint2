import React from 'react'; // eslint-disable-line no-unused-vars
// import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';

// import filterInputAttributes from './filter-input-attributes';


class Input extends React.PureComponent {
    onChange = () => {
        this.props.onChange(this.input.value);
    };

    onFocus = () => {
        this.props.onFocus();
    };

    onBlur = () => {
        this.props.onBlur();
    };

    // /**
    //  * When a key gets pressed in the input
    //  * @param  {Event} event The keypress event
    //  */
    // onKeyPress = event => {
    //   this.props.onKeyPress(event);
    // };
    //
    /**
     * When a key gets pressed in the input
     * @param  {Event} event The keydown event
     */
    onInputKeyDown = event => {
      // Call props.onKeyDown if defined
      // Gives the developer a little bit more control if needed
      // if (this.props.onKeyDown) {
      //   this.props.onKeyDown(event);
      // }

      switch (event.which) {
        // case 40: // DOWN
        //   if (!event.shiftKey) {
        //     event.preventDefault();
        //     this.props.onNext();
        //   }
        //   break;
        // case 38: // UP
        //   if (!event.shiftKey) {
        //     event.preventDefault();
        //     this.props.onPrev();
        //   }
        //   break;
        case 13: // ENTER
          if (this.props.ignoreEnter) {
            event.preventDefault();
          }

          this.props.onSelect();
          break;
        // case 9: // TAB
        //   if (!this.props.ignoreTab) {
        //     this.props.onSelect();
        //   }
        //   break;
        // case 27: // ESC
        //   this.props.onEscape();
        //   break;
        default:
          break;
      }
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
     * Render the view
     * @return {Function} The React element to render
     */
    render() {
        const classes = classnames(
            'geosuggest__input',
            this.props.className
        );

        return <input className={classes}
                      ref={i => this.input = i}
                      type='search'
                      autoComplete='false'
                      placeholder={this.props.placeholder}
                      value={this.props.value}
                      style={this.props.style}
                      onKeyDown={this.onInputKeyDown}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}/>;
    }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
    className: '',
    value: '',
    placeholder: 'Enter a location name',
    ignoreTab: false,
    // onKeyDown: () => {
    // },
    // onKeyPress: () => {
    // },
    autoComplete: 'off'
};

export default Input;