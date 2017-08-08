import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import '../index.css';
import Map from './leaflet/Map';
import Geonames from './GooglePlacesSearch/GooglePlacesSearch';

//import components as needed
import PriorityTab from './Prioritytab'
import IndicatorsTab from './IndicatorsTab'
import ThreatsTab from './ThreatsTab'
import PartnersTab from './PartnersTab'
import HomeTab from './HomeTab'
import ContactTab from './ContactTab'

import * as UnitActions from '../Actions/actions';

class App extends Component {
    // static propTypes = {
    //     selectedUnit: PropTypes.string.isRequired,
    //     items: PropTypes.array.isRequired,
    //     isFetching: PropTypes.bool.isRequired,
    //     dispatch: PropTypes.func.isRequired
    // }

    // componentDidMount(){
    // }

    componentWillReceiveProps(nextProps) {
        console.log('Next Props: ', nextProps)
    }

    constructor(props) {
        super(props);
        console.log('App props (from redux store):', props);

        this.tabs = ['Priority', 'Indicators', 'Threats', 'Partners'];
        this.toptabs = ['Home','Contact'];

        this.state = {
            activeTab: null,
            place: null
        };
    }

    changeTab(tab) {
        if(tab === this.state.activeTab){
            this.setState({
                activeTab: null
            });
        }
        else {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleUnitSelect = (id) => {
        console.log('Select map unit: ', id);
        this.props.selectUnit(id);
    }

    handleUnitDeselect = () => {
        console.log('Deselect map unit');
        this.props.deselectUnit();
    }


    renderActiveTab() {
        const {data} = this.props;
        switch (this.state.activeTab) {//if the previous state is the same tab, then close the tab
            case 'Priority':
                return <PriorityTab data={data}/>
            case 'Indicators':
                return <IndicatorsTab data={data}/>
            case 'Threats':
                return <ThreatsTab data={data}/>
            case 'Partners':
                return <PartnersTab data={data}/>
            case 'Home':
                return <HomeTab/>
            case 'Contact':
                return <ContactTab/>
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="App">
                <Map place={this.state.place} selectUnit={this.handleUnitSelect} deselectUnit={this.handleUnitDeselect}/>

                <div id="TopBar" className="toptabs">
                    {this.toptabs.map((tabName, index) => (
                        <div key={index}
                            className={(this.state.activeTab !== null && this.state.activeTab === tabName) ?'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ ((this.state.activeTab !== null && this.state.activeTab === tabName) ? tabName+'active' : tabName) +'.png'} height={20} alt=""/><div className="imgwrap">{tabName}</div></div>
                    ))}
                      <Geonames onFocus={()=>this.changeTab(null)} onSelect={(place)=>this.setState({place: place})}/>
                </div>

                { this.renderActiveTab() }

                <div id ="Footer" className="tabs">
                    {this.tabs.map((tabName, index) => (
                        <div key={index}
                            className={this.state.activeTab === tabName ? 'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}>
                            < img src={'/images/' + ((this.state.activeTab !== null && this.state.activeTab === tabName) ? tabName+'active' : tabName) + '.png'} height={20} alt=""/>
                            <div className="imgwrap">{tabName}</div>
                        </div>
                        ))}
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    UnitActions
)(App);
