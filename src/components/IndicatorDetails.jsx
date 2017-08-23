import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {formatPercent} from '../utils';


class IndicatorDescription extends Component {

    handleBackClick = (event) => {
        event.preventDefault();
        this.props.onClick();
    }

    render() {
        console.log('Indicator props:', this.props)

        const {label, description, valueLabels, percent, ecosystemLabel} = this.props;

        let percents = Object.keys(valueLabels).map((value, i) => {
            return {
                value: value,
                label: valueLabels[value],
                percent: percent[i]
            };
        });

        console.log('percents', percents)

        return (
            <div id='IndicatorDetails'>
                <div>
                    <a href="" onClick={this.handleBackClick}>&lt; {ecosystemLabel}</a>
                </div>
                <h3 style={{marginTop: 10}}>
                    {label}
                </h3>
                <p>
                    {description}
                </p>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>% of area</th>
                        </tr>
                    </thead>
                    <tbody>
                        {percents.map((item) => {
                            return (
                                <tr>
                                    <td>{item.label}</td>
                                    <td>{(item.percent)? formatPercent(item.percent) + '%': '-'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

// IndicatorDescription.propTypes = {};
// IndicatorDescription.defaultProps = {};

export default IndicatorDescription;
