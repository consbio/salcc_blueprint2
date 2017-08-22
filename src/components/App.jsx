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
// import ThreatsTab from './ThreatsTab';
import PartnersTab from './PartnersTab';
import InfoTab from './InfoTab';

import * as UnitActions from '../Actions/actions';


class App extends Component {
    constructor(props) {
        super(props);
        console.log('App props (from redux store):', props);

        this.tabs = ['Priority', 'Indicators', 'Partners'];  // TODO: 'Threats'

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
    };

    handleUnitDeselect = () => {
        console.log('Deselect map unit');
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

    renderUnitName() {
        if (this.props.selectedUnit === null) return null;

        if (this.props.isPending) {
            return (
                <div id="UnitName">
                    <h1>Loading...</h1>
                    <ResetIcon id="CloseButton" onClick={this.handleCloseButton}/>
                </div>
            );
        }

        return (
            <div id="UnitName">
                <h1>{this.props.data.name}</h1>
                <ResetIcon id="CloseButton" onClick={this.handleCloseButton}/>
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
        switch (this.state.activeTab) {//if the previous state is the same tab, then close the tab
            case 'Priority':
                return <PriorityTab {...this.props}/>;
            case 'Indicators':
                return <IndicatorsTab  {...this.props}/>;
            // case 'Threats':
            //     return <ThreatsTab  {...this.props}/>;
            case 'Partners':
                return <PartnersTab  {...this.props}/>;
            case 'Info':
                return <InfoTab/>;
            default:
                return null;
        }
    }

    renderFooter() {
        if (this.state.activeTab === 'Info') return null;

        // Animate opacity property
        const opacity = (this.props.selectedUnit === null || this.props.isPending)? 0: 1;

        return (
            <footer style={{opacity: opacity}}>
                <div className="tabs">
                { this.tabs.map((tab, index) => this.renderTab(tab, index)) }
                </div>
            </footer>
        );
    }

    renderError () {
        if (!this.props.hasError) return null;

        return (
            <div id="FullScrim">
                <p>Oops!  Something went wrong...</p>
                <p>
                    <a href="#" onClick={this.handleTryAgainClick}>Try again?</a>
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
                     onDeselectUnit={this.handleUnitDeselect}/>

                <header>
                    <div id="InfoButton"
                         className={this.state.activeTab === 'Info' ? 'active' : ''}
                         onClick={() => this.changeTab('Info')}>
                        i
                    </div>
                    <Geonames selected={this.state.place}
                        onFocus={() => this.changeTab(null)}
                        onSelect={(place) => this.setState({place: place})}/>
                </header>

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
