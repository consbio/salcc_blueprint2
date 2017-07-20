import React, { Component } from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import '../index.css';
import Map from './leaflet/Map';
import Geonames from './GooglePlacesSearch/GooglePlacesSearch';

//import components as needed
import TabOne from './Prioritytab.js'
import TabTwo from './IndicatorsTab.js'
import TabThree from './ThreatsTab.js'
import TabFour from './PartnersTab.js'
import TabFive from './HomeTab.js'
import TabSix from './ContactTab.js'

//import actions
import * as UnitActions from '../Actions/actions';

class App extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            activeTab: null,
            tabs: ['Priority', 'Indicators', 'Threats', 'Partners'],
            images: null,
            toptabs: ['Home','Contact']
        };
    }

    changeTab(tab) {
        if(tab === this.state.activeTab){
            this.setState({
                ...this.state,
                activeTab: null
            });
        }
        else {
            this.setState({
                ...this.state,
                activeTab: tab
            });
        }
    }
    //trying to reuse this code in changeTab function
    onClick = (event) => {
        let id = parseInt(event.currentTarget.dataset.id, 10);
        console.log('setstate', id)
        // if this matches previous tab, deselect it
        this.setState({activeTab: (this.state.activeTab === id)? null: id});
    }

    renderActiveTab() {
        //const { unit, actions } = this.props;
        switch (this.state.activeTab) {//if the previous state is the same tab, then close the tab
            case 'Priority':
                return <TabOne />
            case 'Indicators':
                return <TabTwo />
            case 'Threats':
                return <TabThree />
            case 'Partners':
                return <TabFour />
            case 'Home':
                return <TabFive />
            case 'Contact':
                return <TabSix />
            case null:
                return <Map />
        }
    }

    render() {
        return (
            <div className="App">
                <div id="Container" className="tabContentHolder">
                    <div id="TopBar" className="toptabs">
                    {this.state.toptabs.map((tabName, index) => (
                        <div key={index}
                            className={(this.state.activeTab !== null && this.state.activeTab === tabName) ?'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ ((this.state.activeTab !== null && this.state.activeTab === tabName) ? tabName+'active' : tabName) +'.png'} height={20} alt=""/><div className="imgwrap">{tabName}</div></div>
                    ))}
                      <Geonames />
                    </div>
                    <div className="tabContent">{
                                this.renderActiveTab()
                        }
                    </div>
                </div>
                <div id ="Footer" className="tabs">
                    {this.state.tabs.map((tabName, index) => (
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

//App.propTypes = {
  //  item: PropTypes.array.isRequired,
  //  isFetching: PropTypes.object.isRequired
//};

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    UnitActions
)(App);
