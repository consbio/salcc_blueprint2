import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import '../index.css';
import Map from './Map';
import Geonames from './GooglePlacesSearch/GooglePlacesSearch';
import ResetIcon from './icons/ResetIcon';

//import components as needed
import PriorityTab from './Prioritytab';
import IndicatorsTab from './IndicatorsTab';
import ThreatsTab from './ThreatsTab';
import PartnersTab from './PartnersTab';
import InfoTab from './InfoTab';

import * as UnitActions from '../Actions/actions';


class App extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('Next Props: ', nextProps)
    }

    constructor(props) {
        super(props);
        console.log('App props (from redux store):', props);

        this.tabs = ['Priority', 'Indicators', 'Partners'];  // TODO: 'Threats',
        this.toptabs = ['Home'];  // TODO: ,'Contact'

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

    handleCloseButton = () => {
        this.props.deselectUnit();
        this.setState({activeTab: null});
    }

    renderHeader() {
        // TODO: ID is temporary, for debugging!
        if (this.props.selectedUnit === null) return null;

        return (
            <div id="Header">
                <h1>{this.props.data.name} {this.props.selectedUnit}</h1>
                <ResetIcon id="CloseButton" onClick={this.handleCloseButton}/>
                {/*<div id="CloseButton" onClick={this.handleCloseButton}>X</div>*/}
                {/*<img id="CloseButton" src="/icons/reset.svg" onClick={this.handleCloseButton} />*/}
            </div>
        );
    }

    renderTab(tab, index) {
        const active = this.state.activeTab === tab ? 'active' : '';
        const className = `tab ${active}`;
        const icon = `/images/${tab}${active}.png`; // TODO: convert to SVG

        return (
            <div key={index}
                className={className}
                onClick={() => this.changeTab(tab)}>
                <img src={icon} alt=""/>
                <label>{tab}</label>
            </div>
        );
    }

    renderActiveTab() {
        const {data} = this.props;
        switch (this.state.activeTab) {//if the previous state is the same tab, then close the tab
            case 'Priority':
                return <PriorityTab data={data}/>;
            case 'Indicators':
                return <IndicatorsTab data={data}/>;
            // case 'Threats':
            //     return <ThreatsTab data={data}/>;
            case 'Partners':
                return <PartnersTab data={data}/>;
            case 'Info':
                return <InfoTab/>;
            default:
                return null;
        }
    }

    renderFooter() {
        if (this.props.selectedUnit === null) return null;

        return (
            <div id ="Footer">
                <div className="tabs">
                { this.tabs.map((tab, index) => this.renderTab(tab, index)) }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <Map place={this.state.place}
                     selectedUnit={this.props.selectedUnit}
                     onSelectUnit={this.handleUnitSelect}
                     onDeselectUnit={this.handleUnitDeselect}/>

                <div id="TopBar">
                    <div id="InfoButton"
                         className={this.state.activeTab === 'Home' ? 'active' : ''}
                         onClick={() => this.changeTab("Info")}>
                        i
                    </div>
                    <Geonames selected={this.state.place}
                        onFocus={() => this.changeTab(null)}
                        onSelect={(place) => this.setState({place: place})}/>
                </div>

                { this.renderHeader() }
                { this.renderActiveTab() }
                { this.renderFooter() }
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
