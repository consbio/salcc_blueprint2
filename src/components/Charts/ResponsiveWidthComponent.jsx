import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ResponsiveWidthComponent extends Component {
    // Handle width properly, inspired by:
    // https://github.com/codesuki/react-d3-components/issues/9

    constructor(props) {
        super(props);
        this.state = {width: 0};
        this.domNode = null;
    }

    fitToParentSize() {
        const width = this.domNode.parentNode.offsetWidth - this.props.insetWidth;
        if (width !== this.state.width) {
            this.setState({width});
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.fitToParentSize.bind(this));
        this.fitToParentSize();
    }

    componentWillReceiveProps() {
        this.fitToParentSize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.fitToParentSize.bind(this));
    }

    // Root node of component MUST set reference for this.domNode
    // render() {
    //     return (
    //         <div ref={(node) => {this.domNode = node}}></div>
    //     );
    // }

}

ResponsiveWidthComponent.propTypes = {
    insetWidth: PropTypes.number
};

ResponsiveWidthComponent.defaultProps = {
    insetWidth: 0  // corresponds to the total padding width of the parent node
};

export default ResponsiveWidthComponent;
