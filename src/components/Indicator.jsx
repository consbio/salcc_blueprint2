import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WhiskerPlot from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';




class Indicator extends Component {

    // renderIndicatorDescription(indicatordes, name){
    //     return <WhiskerDes indicatordes = {this.props.data} name = {name}/>
    // }

    // renderIndicators() {
        // return Object.keys(this.props.data.indicator_stats).map((name, index)=>
        //         <div onClick={(e) => {e.stopPropagation();
        //         this.renderIndicatorDescription.bind(this.props.data ,name);}}>{name.includes(thing) ? <WhiskerPlot indicatorname = {name} values =
        //             {this.props.data.indicator_stats} /> : '' }
        //         </div>
        // )
    // }


    render() {
        console.log('Indicator props:', this.props)
        const {label, unitMean, domain, datasetID} = this.props;

        return (
            <section className="indicator">
                <h4>
                    {/*only if not mobile version*/}
                    {/*<a href={`https://salcc.databasin.org/datasets/${datasetID}`} target="_blank" title="View this indicator in the Conservation Planning Atlas">*/}
                        {/*{label}*/}
                    {/*</a>*/}
                    {label}
                </h4>
                <WhiskerPlot value={unitMean} domain={domain} />



            </section>
        );
    }
}

Indicator.propTypes = {};
Indicator.defaultProps = {};

export default Indicator;
