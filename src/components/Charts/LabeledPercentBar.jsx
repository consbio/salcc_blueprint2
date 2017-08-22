import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PercentBar from './PercentBar';

// TODO: pull out into a utility function
function formatPercent(percent) {
    if (percent < 1) {
        return '< 1'
    }
    if (percent < 5) {
        // round to nearest 1 decimal place
        return Math.round(percent * 10) / 10;
    }
    if (percent > 99 && percent < 100) {
        return '> 99';  // it looks odd to have 100% stack up next to categories with <1
    }
    return Math.round(percent);
}

class LabeledPercentBar extends Component {
    render() {
        const {label, percent} = this.props;
        console.log('percentBar prps', this.props)

        // TODO: make this into a utility function
        const percentLabel = formatPercent(percent);

        return (
            <div className="chart-labeledpercentbar">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    <div>{label}</div>
                    <label>{percentLabel}%</label>
                </div>
                <PercentBar {...this.props}/>
            </div>
        );
    }
}

LabeledPercentBar.propTypes = {};

LabeledPercentBar.defaultProps = {};

export default LabeledPercentBar;
