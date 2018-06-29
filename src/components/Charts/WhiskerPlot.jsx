import React from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'

import ResponsiveWidthComponent from './ResponsiveWidthComponent'

class WhiskerPlot extends ResponsiveWidthComponent {
    render() {
        const { value, domain, color } = this.props
        const { width } = this.state

        const textHeight = 12
        const margin = {
            top: 0,
            right: 32,
            bottom: 0,
            left: 36
        }
        const height = margin.top + margin.bottom + 40
        const midY = height / 2
        /* eslint-disable no-mixed-operators */
        const textY = midY + textHeight / 2 - 2
        const x = scaleLinear()
            .range([margin.left, width - margin.left])
            .domain(domain)
        const xPos = x(value)
        const yOffset = 2
        const triangleHeight = midY - yOffset
        const triangleWidth = 8 // actually 1/2 of width

        const poly = `${xPos},${midY + yOffset} ${xPos - triangleWidth},${midY + triangleHeight + yOffset} ${xPos +
            triangleWidth},${midY + triangleHeight + yOffset}`

        return (
            <div
                ref={(node) => {
                    this.domNode = node
                }}
            >
                {this.state.width > 0 && (
                    <svg className="chart-whisker" width={width} height={height}>
                        <line
                            className="domain"
                            x1={x.range()[0]}
                            x2={x.range()[1]}
                            y1={midY}
                            y2={midY}
                            stroke="#0892d0"
                        />
                        <polygon points={poly} fill={color} />
                        <text x="0" y={textY} textAnchor="begin" fill="#AAA" fontSize={12}>
                            Low
                        </text>
                        <text x={width} y={textY} textAnchor="end" fill="#AAA" fontSize={12}>
                            High
                        </text>
                    </svg>
                )}
            </div>
        )
    }
}

WhiskerPlot.propTypes = {
    value: PropTypes.number.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired, // absolute range: [0, 1]
    color: PropTypes.string.isRequired,
    insetWidth: PropTypes.number
}

WhiskerPlot.defaultProps = {
    insetWidth: 20 // parent padding
}

export default WhiskerPlot
