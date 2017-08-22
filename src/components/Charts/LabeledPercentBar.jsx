import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatPercent} from '../../utils';
import PercentBar from './PercentBar';



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
