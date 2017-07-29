import React, { Component } from 'react';
//import { LabelCheckbox } from 'material-ui/Checkbox';
import Whisker from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

//The number of slides has to change depending on how many Ecosystems are tied to a specific watershed.
//Odd slides background color #FFFFFF
//Even slides background color #EFF3F4
const styles = {
    slide: {
        padding: 0,
        minHeight: 410,
        color: '#fff',
    },
    slide1: {
        backgroundColor: '#Ffffff',
    },
    slide2: {
        backgroundColor: '#eff3f4',
    },
    slide3: {
        backgroundColor: '#ffffFF',
    },
};

class IndicaTabs extends Component {

    state = {
        index: 0,
    };

    handleChangeTabs = (event, value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = (index) => {
        this.setState({
            index,
        });
    };

    renderFooter(){
        return Object.keys(this.props.data.ecosystems).map((thing, index)=>
            <div className={this.state.index === index ? 'flex-item2 active' : 'flex-item2'}
                 onClick={() => this.handleChangeIndex(index)}><img src={'/SALCC_icons/Icon-' + thing + '.svg'}
                                                                    height={30} alt=""/></div>);
    }

    renderInsides(){
        return Object.keys(this.props.data.ecosystems).map((thing, index)=>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
            <div className="flex-container2">
                <div className="flex-item2"> <img src={'/SALCC_icons/Icon-'+ thing +'.svg'} height={40} alt=""/></div>
                <div className="flex-item2"><h4>{thing +' '}</h4></div>
                <div className="flex-item2"> <p>{'('+ this.props.data.ecosystems[thing] + '% )'}</p></div>
            </div>
            <div>{this.renderWhiskers(thing)}</div>
        </div>);
    }

    renderIndicatorDescription(){
        return <WhiskerDes indicatordes = {this.props.data}/>
    }

    renderWhiskers(thing){ //consider using filter first
        return Object.keys(this.props.data.indicator_stats).map((name, index)=>
                <div>{name.includes(thing) ? <Whisker indicatorname = {name} values =
                    {this.props.data.indicator_stats} /> : '' }
                </div>
        )
    }

    render(){
        const {
            index,
        } = this.state;

        return (
            <div id ="Content">
                <h2>{this.props.data.name}</h2>
                <SwipeableViews index = {index} onChangeIndex={this.handleChangeIndex}>
                   { this.renderInsides() }
                </SwipeableViews>
                <div id="Footer2">
                    <div className="flex-container">
                        { this.renderFooter() }
                    </div>
                </div>
            </div>
        );
    }
}

IndicaTabs.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        //indicator_stats: PropTypes.array, //({
        //Each one is a whiskerplot
        //List of all the different kinds of indicator_stats has to be here
        /*PineAndPraire_Birds: PropTypes.array,
         Estuarine_CoastalCondition: PropTypes.array,
         EstuarineMarsh_WetlandPatchSize: PropTypes.array,
         FreshwaterMarsh_Birds: PropTypes.array,
         PineAndPrairie_Amphibians: PropTypes.array,
         PineAndPrairie_RegularlyBurnedHabitat: PropTypes.array,
         EstuarineMarsh_Water_VegetationEdge: PropTypes.array,
         Landscapes_LowRoadDensityPatches: PropTypes.array,
         FreshwaterAquatic_PermeableSurface: PropTypes.array,
         FreshwaterAquatic_ImperiledAquaticSpecies: PropTypes.array,
         Waterscapes_MigratoryFishConnectivity: PropTypes.array,
         Waterscapes_NetworkComplexity: PropTypes.array,
         ForestedWetland_Birds: PropTypes.array,
         ForestedWetland_Amphibians: PropTypes.array,
         Landscapes_ResilientBiodiversityHotspots: PropTypes.array,
         FreshwaterAquatic_RiparianBuffers: PropTypes.array,
         Landscapes_LowUrbanHistoric: PropTypes.array
         }),*/
        //ecosystems: PropTypes.array,/*.shape({

        /* estuaries: PropTypes.number,
         pine_and_prairie: PropTypes.number,
         freshwater_marsh: PropTypes.number,
         forested_wetland: PropTypes.number
         }),*/
        name: PropTypes.string
    })
};

export default IndicaTabs;
