import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Whisker from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';

// Ecosystem globals live here
const ecosystemConfig = {
    'BeachAndDune': {
        label: 'Beach and dune',
        color: '#e7cb94'
    },
    'Estuarine': {
        label: 'Estuarine',
        color: '#9edae5'
    },
    'ForestedWetland': {
        label: 'Forested wetland',
        color: '#cedb9c'
    },
    'FreshwaterMarsh': {
        label: 'Freshwater marsh',
        color: '#9c9ede'
    },
    'MaritimeForest': {
        label: 'Maritime forest',
        color: '#8ca252'
    },
    'PineAndPrairie': {
        label: 'Pine and prairie',
        color: '#bd9e39'
    },
    'UplandHardwood': {
        label: 'Upland hardwood',
        color: '#637939'
    },
    'Marine': {
        label: 'Marine',
        color: '#1f77b4'
    },

    // universal(cross-system) ecosystems, these will not have a percent
    'FreshwaterAquatic': {
        label: 'Freshwater aquatic',
        color: '#1f77b4',
        isUniversal: true
    },
    'Landscapes': {
        label: 'Landscapes',
        color: '#c7e9c0',
        isUniversal: true
    },
    'Waterscapes': {
        label: 'Waterscapes',
        color: 'c6dbef',
        isUniversal: true
    }
};


// not needed, just split on underscore in indicatorID
// var ecosystemIndicators = {
//     'BeachAndDune': ['BeachAndDune_BeachBirds', 'BeachAndDune_UnalteredBeach'],
//     'Estuarine': ['Estuarine_CoastalCondition', 'Estuarine_Water_VegetationEdge', 'Estuarine_WetlandPatchSize'],
//     'ForestedWetland': ['ForestedWetland_Amphibians', 'ForestedWetland_Birds'],
//     'FreshwaterMarsh': ['FreshwaterMarsh_Birds'],
//     'MaritimeForest': ['MaritimeForest_MaritimeForestExtent'],
//     'PineAndPrairie': ['PineAndPrairie_Amphibians', 'PineAndPrairie_Birds', 'PineAndPrairie_RegularlyBurnedHabitat'],
//     'UplandHardwood': ['UplandHardwoods_Birds', 'UplandHardwood_UrbanOpenSpace'],
//     'Marine': ['Marine_Mammals', 'Marine_PotentialHardbottomCondition'],
//     //These are landscape wide, only for inland
//     'FreshwaterAquatic': ['FreshwaterAquatic_PermeableSurface', 'FreshwaterAquatic_RiparianBuffers', 'FreshwaterAquatic_ImperiledAquaticSpecies'],
//     'Landscapes': ['Landscapes_LowRoadDensityPatches', 'Landscapes_LowUrbanHistoric', 'Landscapes_ResilientBiodiversityHotspots'],
//     'Waterscapes': ['Waterscapes_MigratoryFishConnectivity', 'Waterscapes_NetworkComplexity']
// };




class Ecosystem extends Component {



    renderIndicatorDescription(indicatordes, name){
        return <WhiskerDes indicatordes = {this.props.data} name = {name}/>
    }

    RenderIndicators(thing){ //consider using filter first
        return Object.keys(this.props.data.indicator_stats).map((name, index)=>
                <div onClick={(e) => {e.stopPropagation();
                this.renderIndicatorDescription.bind(this.props.data ,name);}}>{name.includes(thing) ? <Whisker indicatorname = {name} values =
                    {this.props.data.indicator_stats} /> : '' }
                </div>
        )
    }

    render() {
        console.log('Ecosystem props:', this.props)

        //     <div style={Object.assign({}, styles.slide, styles.slide2)}>

        const {ecosystemID, percent} = this.props;
        // TODO: format percent
        const {label} = ecosystemConfig[ecosystemID];

        return (

            <div>
                <div className="flex-container3">
                    <div className="flex-item2"> <img src={'/icons/' + ecosystemID + '.svg'} height={40} alt=""/></div>
                    <div className="flex-item2"><h4>{label}</h4></div>
                    <div className="flex-item2"> <p>{' ('+ percent + '% )'}</p></div>
                </div>
                <div>{this.RenderIndicators(ecosystemID)}</div>
            </div>
        );
    }
}

Ecosystem.propTypes = {};
Ecosystem.defaultProps = {};

export default Ecosystem;
