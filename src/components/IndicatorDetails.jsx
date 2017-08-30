import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {formatPercent} from '../utils';
import LabeledPercentBar from './Charts/LabeledPercentBar';


class IndicatorDescription extends Component {

    handleBackClick = (event) => {
        event.preventDefault();
        this.props.onClick();
    }

    renderValue(item) {
        const {value, label, percent} = item;

        return (
            <LabeledPercentBar className="text-quiet" key={value} label={label} percent={percent} height={6}/>
        )
    }

    render() {
        const {label, description, valueLabels, percent, ecosystemLabel, ecosystemIcon} = this.props;

        let percents = Object.keys(valueLabels).map((value, i) => {
            return {
                value: value,
                label: valueLabels[value],
                percent: percent[i]
            };
        });
        percents.reverse();

        return (
            <div id='IndicatorDetails'>
                <div className="ecosystem-header flex-container flex-justify-start flex-align-center" onClick={this.handleBackClick} >
                    <a href="">&lt;&lt;</a>
                    <img src={ecosystemIcon} alt=""/>
                    <h3>{ecosystemLabel}</h3>
                </div>


                <h3 style={{marginTop: 10}}>
                    {label}
                </h3>
                <p>
                    {description}
                </p>
                <div style={{marginTop: 30}}>
                    {percents.map(this.renderValue)}
                </div>
            </div>
        );
    }
}

// IndicatorDescription.propTypes = {};
// IndicatorDescription.defaultProps = {};

export default IndicatorDescription;
