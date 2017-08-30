import React from "react";
import ResponsiveWidthComponent from './ResponsiveWidthComponent';
// import PropTypes from "prop-types";
import {scaleLinear} from 'd3-scale';


class WhiskerPlot extends ResponsiveWidthComponent {

    render() {
        const {value, domain, color, goodConditionThreshold} = this.props;
        const textHeight = 12;
        const {width} = this.state;
        // const radius = 12;
        const margin = {
            top: 0,
            right: 32,
            bottom: 0,
            left: 36
        };
        // const height = 2 * radius + margin.top + margin.bottom;
        const height = margin.top + margin.bottom + 40;
        const midY = height / 2;
        const textY = midY + textHeight / 2 - 2;
        const x = scaleLinear().range([margin.left, width - margin.left]).domain(domain);
        const xPos = x(value);
        const yOffset = 4;
        const triangleHeight = midY - yOffset;
        const triangleWidth = 8; // actually 1/2 of width

        const poly = `${xPos},${midY+yOffset} ${xPos-triangleWidth},${midY+triangleHeight+yOffset} ${xPos+triangleWidth},${midY+triangleHeight+yOffset}`;

        return (
            <div ref={(node) => {this.domNode = node}}>
                {this.state.width > 0 &&
                    (
                        <svg className="chart-whisker" width={width} height={height}>

                            {goodConditionThreshold !== null
                                ?
                                (<g>
                                    <line className="domain" x1={x.range()[0]} x2={x(goodConditionThreshold)} y1={midY} y2={midY} stroke="#FF851B"/>
                                    <line className="domain" x1={x(goodConditionThreshold)} x2={x.range()[1]} y1={midY} y2={midY} stroke="#0C5DA5"/>
                                </g>)
                                :
                                <line className="domain" x1={x.range()[0]} x2={x.range()[1]} y1={midY} y2={midY} stroke="#777"/>
                            }

                            {/*<circle cx={x(value)} cy={midY} r={radius} fill={color}/>*/}
                            <polygon points={poly} fill={color} />
                            <text x="0" y={textY} textAnchor="begin" fill="#AAA" fontSize={12}>Low</text>
                            <text x={width} y={textY} textAnchor="end" fill="#AAA" fontSize={12}>High</text>
                        </svg>
                    )
                }
            </div>
        );
    }
}

WhiskerPlot.defaultProps = {
    value: 0, // == mean
    // categoricalValues: [0, 1, 2, 3, 4],  // if present, show as labels on the chart
    domain: [0, 1], // == absolute range
    icon: null,  // url to icon, optional
    color: '#DDD',
    goodConditionThreshold: null,

    insetWidth: 20 // parent padding
};


export default WhiskerPlot;
