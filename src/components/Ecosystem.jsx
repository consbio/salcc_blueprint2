import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Whisker from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';

// Ecosystem globals live here
const ecosystemConfig = {
    'beach_and_dune': {
        label: 'Beach and dune',
        color: '#e7cb94'
    },
    'estuaries': {
        label: 'Estuarine',
        color: '#9edae5'
    },
    'forested_wetland': {
        label: 'Forested wetland',
        color: '#cedb9c'
    },
    'freshwater_marsh': {
        label: 'Freshwater marsh',
        color: '#9c9ede'
    },
    'maritime_forest': {
        label: 'Maritime forest',
        color: '#8ca252'
    },
    'pine_and_prairie': {
        label: 'Pine and prairie',
        color: '#bd9e39'
    },
    'upland_hardwood': {
        label: 'Upland hardwood',
        color: '#637939'
    },
    'marine': {
        label: 'Marine',
        color: '#1f77b4'
    },

    // universal(cross-system) ecosystems, these will not have a percent
    'freshwater_aquatic': {
        label: 'Freshwater aquatic',
        color: '#1f77b4',
        isUniversal: true
    },
    'landscapes': {
        label: 'Landscapes',
        color: '#c7e9c0',
        isUniversal: true
    },
    'waterscapes': {
        label: 'Waterscapes',
        color: 'c6dbef',
        isUniversal: true
    }
};



class Ecosystem extends Component {



    renderIndicatorDescription(indicatordes, name){
        return <WhiskerDes indicatordes = {this.props.data} name = {name}/>
    }

    renderWhiskers(thing){ //consider using filter first
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
                    <div className="flex-item2"> <img src={'/SALCC_icons/Icon-'+ ecosystemID +'.svg'} height={40} alt=""/></div>
                    <div className="flex-item2"><h4>{label}</h4></div>
                    <div className="flex-item2"> <p>{' ('+ percent + '% )'}</p></div>
                </div>
                <div>{this.renderWhiskers(ecosystemID)}</div>
            </div>
        );
    }
}

Ecosystem.propTypes = {};
Ecosystem.defaultProps = {};

export default Ecosystem;
