import React from 'react'
import PropTypes from 'prop-types'

import PercentBar from './PercentBar'
import { formatPercent } from '../../utils'

const LabeledPercentBar = (props) => {
    const { label, description, percent } = props
    const percentLabel = formatPercent(percent)

    return (
        <div className="chart-labeledpercentbar">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}
            >
                <div title={description}>{label}</div>
                <label>{percentLabel}%</label>
            </div>
            <PercentBar {...props} />
        </div>
    )
}

LabeledPercentBar.propTypes = {
    label: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
    description: PropTypes.string
}

LabeledPercentBar.defaultProps = {
    description: null
}

export default LabeledPercentBar
