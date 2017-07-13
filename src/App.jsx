import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import Map from './components/leaflet/Map';
import BarChart from './components/Charts/BarChart'
import Geonames from './components/GooglePlacesSearch/GooglePlacesSearch';

import TabOne from './components/Prioritytab.js'
import TabTwo from './components/IndicatorsTab.js'
import TabThree from './components/ThreatsTab.js'
import TabFour from './components/PartnersTab.js'
import TabFive from './components/HomeTab.js'
import TabSix from './components/ContactTab.js'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
            tabs: ['Priority', 'Indicators', 'Threats', 'Partners'],
            images: null,
            toptabs: ['Home','Contact']
        };
    }

    changeTab(tab) {
        this.setState({
            ...this.state,
            activeTab: tab
        });
    }

    renderActiveTab() {
        switch (this.state.activeTab) {
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
                return <Map/>
        }
    }

    render() {
        return (
            <div className="App">
                <div id="Container" className="tabContentHolder">
                    <div id="TopBar" className="toptabs">
                    {this.state.toptabs.map((tabName) => (
                        <div
                            className={(this.state.activeTab !== null && this.state.activeTab === tabName) ?'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ tabName +'.png'} height={20}/><div className="imgwrap">{tabName}</div></div>
                    ))}
                      <Geonames />
                    </div>
                    <div className="tabContent">{
                                this.renderActiveTab()
                        }
                    </div>
                </div>
                <div id ="Footer" className="tabs">
                    {this.state.tabs.map((tabName) => (
                        <div
                            className={this.state.activeTab === tabName ? 'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}>
                            < img src={'/images/' + tabName + '.png'} height={20}/>
                            <div className="imgwrap">{tabName}</div>
                        </div>
                        ))}
                </div>
            </div>

        );
    }
}

export default App;
