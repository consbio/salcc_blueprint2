import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {formatPercent} from '../utils';


class IndicatorDescription extends Component {

    handleBackClick = (event) => {
        event.preventDefault();
        this.props.onClick();
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
                {/*<div>*/}
                    {/*<a href="" onClick={this.handleBackClick}>&lt; {ecosystemLabel}</a>*/}
                {/*</div>*/}

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
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>% of area</th>
                        </tr>
                    </thead>
                    <tbody className="text-quieter">
                        {percents.map((item) => {
                            return (
                                <tr key={item.value}>
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
