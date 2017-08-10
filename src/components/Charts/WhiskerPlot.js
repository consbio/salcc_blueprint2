import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import WhiskerDes from './WhiskerDescription';
import indicators from '../../configindica';
import {scale, linear, range} from 'd3';


class WhiskerPlot extends Component {

    // Handle width properly, from: https://github.com/codesuki/react-d3-components/issues/9
    constructor() {
        super();
        this.state = {width: 0};
        this.domNode = null;
    }

    fitToParentSize() {
        console.log('Fit to parent', this.domNode)
        // const elem = ReactDOM.findDOMNode(this);
        const elem = this.domNode;
        const width = elem.parentNode.offsetWidth;
        // const height = elem.parentNode.offsetHeight;
        if (width !== this.state.width) {
            this.setState({width});
        }
    }

    componentDidMount() {
      this.fitToParentSize();
    }


    render() {
        console.log('state', this.state)
        const {value, domain, icon, isGoodCondition} = this.props;
        const textHeight = 12;
        const {width} = this.state;

        const radius = 18;

        const margin = {
            left: radius + 2 + 30, // these were based on word sizes
            right: radius + 2,
            top: 10, // may not need as much space without labels
            bottom: 14
        };

        const height = 2 * radius + margin.top + margin.bottom;
        const midY = height / 2;
        const x = scale.linear().range([margin.left, width - margin.left]).domain(domain);

//             <svg className="chart-whisker" width="100%" height={height} viewBox="0 0 100 60">
//                 <line className="domain" x1={10} x2={width -10} y1={midY} y2={midY} fill='#a4aab3' />
//                     {/*<text x={x.range()[0] - 18 - 4} y={midY + textHeight +10} textAnchor='end' fill='#a4aab3' fontSize={10}>Low</text>*/}
//                     {/*<text x={x.range()[0] + 208 + 4} y={midY + textHeight + 10} textAnchor='begin' fill='#a4aab3' fontSize={10}>High</text>*/}
//                     {/*<rect x={50} y={midY -20} width="40" height="40" fill="url(#frogicon)"></rect>*/}
//             </svg>


        return (
            <div ref={(node) => {this.domNode = node}}>
                {this.state.width > 0 &&
                    (<div>
                        <svg className="chart-whisker" width={width} height={height}>
                            <line className="domain" x1={10} x2={width - 10} y1={midY} y2={midY} fill='#a4aab3'/>
                        </svg>
                        <div className="flex-container text-quieter text-small">
                        <div style={{flex:1}}>Low</div>
                        <div className="text-right" style={{flex:1}}>High</div>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

WhiskerPlot.defaultProps = {
    value: 0, // == unitMean
    // categoricalValues: [0, 1, 2, 3, 4],  // if present, show as labels on the chart
    domain: [0, 1], // == absolute range
    icon: null,  // url to icon, optional
    isGoodCondition: null, // 1= good, 0=not good, null=unknown

    // summary unit stats; don't apply to pixel version
    // unitMin: 1, // == unitMin, optional
    // unitMean: 2.4,  // == unitMean
    // unitMax: 3, // == unitMax, optional
};


export default WhiskerPlot;
