import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Map from './Map';
import GooglePlacesSearch from './GooglePlacesSearch/GooglePlacesSearch';
import ResetIcon from './icons/ResetIcon';


import PrioritiesTab from './PrioritiesTab';
import IndicatorsTab from './IndicatorsTab';
// import ThreatsTab from './ThreatsTab';
import PartnersTab from './PartnersTab';
import InfoTab from './InfoTab';
import TabIcons from './icons/TabIcons';


import * as UnitActions from '../Actions/actions';


class App extends Component {
    constructor(props) {
        super(props);

        this.tabs = ['Priorities', 'Indicators', 'Partners'];  // TODO: 'Threats'

        this.state = {
            activeTab: null,
            place: null,
            width: window.innerWidth
        };

        this.placeSearch = null;
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
    };

    handleUnitDeselect = () => {
        this.props.deselectUnit();
    };

    handleCloseButton = () => {
        this.props.deselectUnit();
        this.setState({activeTab: null});
    };

    handleTryAgainClick = (event) => {
        event.preventDefault();
        this.props.deselectUnit();
    };

    handleMapClick = () => {
        if (this.placeSearch !== null) {
            this.placeSearch.blur();
        }
    };

    handlePlaceSelect = (place) => {
        this.setState({place: place});
    }

    renderUnitName() {
        if (this.props.selectedUnit === null) return null;

        const name = (this.props.isPending)? 'Loading...': this.props.data.name;

        return (
            <div id="UnitName"  className="flex-container flex-justify-center flex-align-center">
                <h1>{name}</h1>
                <ResetIcon id="CloseButton" onClick={this.handleCloseButton}/>
            </div>
        );
    }

    renderTab(tab, index) {
        const active = (this.state.activeTab === tab) ? 'active' : '';
        const indicators = (tab === 'Indicators')? 'indicators': '';
        const className = `tab ${active} ${indicators}`;

        return (
            <div key={index}
                 className={className}
                 onClick={() => this.changeTab(tab)}>
                <TabIcons icon={tab} height={24} />
                <label>{tab}</label>
            </div>
        );
    }

    renderActiveTab() {
        if(this.props.isPending) return null;
        switch (this.state.activeTab) {//if the previous state is the same tab, then close the tab
            case 'Priorities':
                return <PrioritiesTab {...this.props}/>;
            case 'Indicators':
                return <IndicatorsTab  {...this.props}/>;
            // case 'Threats':
            //     return <ThreatsTab  {...this.props}/>;
            case 'Partners':
                return <PartnersTab  {...this.props}/>;
            case 'Info':
                return <InfoTab/>;
            default:
                if(this.state.width > 700 && this.props.selectedUnit === null){
                    console.log('width is ', this.state.width);
                    //this.changeTab('Info');
                    console.log(this.state.activeTab);
                    return <InfoTab/>;
                }
                else if (this.state.width > 700 && this.props.selectedUnit !== null && !this.props.isPending){
                    if (this.props.selectedUnit === null) return null;

                    this.changeTab('Priorities');
                    //else if(this.state.activeTab === 'Priorities') return <PrioritiesTab {...this.props}/>;
                    //this.renderActiveTab();
                    //return <PrioritiesTab {...this.props}/>;
                }
                else {
                    return null;
                }
        }
    }

    renderFooter() {
        if (this.state.activeTab === 'Info') return null;

        // Animate opacity property
        const opacity = (this.props.selectedUnit === null || this.props.isPending)? 0: 1;

        return (
            <footer className="flex-container flex-justify-center" style={{opacity: opacity}}>
                { this.tabs.map((tab, index) => this.renderTab(tab, index)) }
            </footer>
        );
    }

    renderHeader(){
        if(this.state.width > 700){

            return(
            <header>
                <div className="flex-container flex-justify-center flex-align-center" style={{}}>
                    <img src="/logo_96x96.png" style={{height: 32, padding:6, verticalAlign: 'middle'}} alt="SALCC Logo"/>
                    South Atlantic Conservation Blueprint 2.2
                </div>

                <GooglePlacesSearch ref={(ref) => this.placeSearch = ref} selected={this.state.place}
                                        onFocus={() => this.changeTab(null)}
                                        onSelect={this.handlePlaceSelect}/>
            </header>
            );
        }
        else{
            return(
            <header>
                <div id="InfoButton"
                         className={this.state.activeTab === 'Info' ? 'active' : ''}
                         onClick={() => this.changeTab('Info')}>
                        i
                    </div>

                    <GooglePlacesSearch ref={(ref) => this.placeSearch = ref} selected={this.state.place}
                                        onFocus={() => this.changeTab(null)}
                                        onSelect={this.handlePlaceSelect}/>
            </header>
            );
        }
    }

    renderError () {
        if (!this.props.hasError) return null;

        return (
            <div id="FullScrim">
                <p>Oops!  Something went wrong...</p>
                <p>
                    <a href="" onClick={this.handleTryAgainClick}>Try again?</a>
                </p>
                <p>
                    If this doesn't work, try reloading this website.
                </p>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <Map place={this.state.place}
                     selectedUnit={this.props.selectedUnit}
                     onSelectUnit={this.handleUnitSelect}
                     onDeselectUnit={this.handleUnitDeselect}
                     onSetLocation={this.handlePlaceSelect}
                     onClick={this.handleMapClick} />


                    { this.renderHeader() }


                <div id="blankContent">Select a tab</div>

                { this.renderUnitName() }
                { this.renderActiveTab() }

                { this.renderFooter() }

                { this.renderError() }
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
