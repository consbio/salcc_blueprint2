import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import BarChart from './BarChart'
import Geonames from './components/Geonames';

import TabOne from './Prioritytab.js'
import TabTwo from './IndicatorsTab.js'
import TabThree from './ThreatsTab.js'
import TabFour from './PartnersTab.js'
import TabFive from './HomeTab.js'
import TabSix from './ContactTab.js'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
            tabs: ['Priority', 'Indicators', 'Threats', 'Partners'],
            images: ['Priority', 'Indicators', 'Threats', 'Partners'],
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
        }
    }

    render() {
        return (
            <div className="App">
                <div id="Container" className="tabContentHolder">
                    <div id="TopBar" className="toptabs">
                    {this.state.toptabs.map((tabName) => (
                        <div
                            className={this.state.activeTab === tabName ? 'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ tabName +'.png'} height={20}/><div className="imgwrap">{tabName}</div></div>
                    ))}
                      <Geonames />
                    </div>
                    <div className="tabContent">
                        {this.renderActiveTab()}
                    </div>
                </div>
                <div id ="Footer" className="tabs">
                    {this.state.tabs.map((tabName) => (

                        <div
                            className={this.state.activeTab === tabName ? 'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ tabName +'.png'} height={20}/><div className="imgwrap">{tabName}</div></div>
                    ))}
                </div>
            </div>

        );
    }
}

export default App;
