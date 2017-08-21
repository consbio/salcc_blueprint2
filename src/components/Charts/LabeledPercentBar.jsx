import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PercentBar from './PercentBar';

// TODO: pull out into a utility function
function formatPercent(percent) {
    // if percent > 10, then round to nearest int
    // if 1 > percent < 10, then round to 1 decimal place
    // if 0 > percent < 1, then round to 2 decimal places

    if (percent < 1) {
        return Math.round(percent * 100) / 100;
    }
    if (percent < 10) {
        return Math.round(percent * 10) / 10;
    }
    return Math.round(percent);
}



class LabelledPercentBar extends Component {
    render() {
        const {label, percent} = this.props;

        // TODO: make this into a utility function
        const percentLabel = formatPercent(percent);

        return (
            <div className="chart-labeledpercentbar">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <div>{label}</div>
                    <label>{percentLabel}%</label>
                </div>
                <PercentBar {...this.props}/>
            </div>
        );
    }
}

LabelledPercentBar.propTypes = {};

LabelledPercentBar.defaultProps = {};

export default LabelledPercentBar;
