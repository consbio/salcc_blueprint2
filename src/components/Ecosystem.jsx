import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Whisker from './Charts/WhiskerPlot.js';
import WhiskerDes from './Charts/WhiskerDescription';

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
        backgroundColor: 'red',
    }
};

// Ecosystem globals live here
const ECOSYSTEMS = {
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

class Ecosystem extends Component {



    renderIndicatorDescription(indicatordes, name){
        return <WhiskerDes indicatordes = {this.props.data} name = {name}/>
    }

    renderIndicators(thing){ //consider using filter first
        return Object.keys(this.props.data.indicator_stats).map((name, index)=>
                <div onClick={(e) => {e.stopPropagation();
                this.renderIndicatorDescription.bind(this.props.data ,name);}}>{name.includes(thing) ? <Whisker indicatorname = {name} values =
                    {this.props.data.indicator_stats} /> : '' }
                </div>
        )
    }

    render() {
        console.log('Ecosystem props:', this.props)

        const {ecosystem, icon, percent, indicators} = this.props;
        const {label} = ECOSYSTEMS[ecosystem];

        // TODO:
        // format percent
        return (
            <div className="ecosystem">
                <div className="flex-container3">
                    <div className="flex-item2">
                        <img src={icon} height={40} alt=""/>
                    </div>

                    <div className="flex-item2"><h4>{label}</h4></div>
                    <div className="flex-item2">{(percent) ? ' ('+ percent + '% )' : ''}</div>
                </div>
                {/*<div>{this.renderIndicators(ecosystemID)}</div>*/}

            </div>
        );
    }
}

Ecosystem.propTypes = {};
Ecosystem.defaultProps = {};

export default Ecosystem;
