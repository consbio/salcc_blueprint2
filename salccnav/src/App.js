import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import BarChart from './BarChart'

import TabOne from './Prioritytab.js'
import TabTwo from './IndicatorsTab.js'
import TabThree from './ThreatsTab.js'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
            tabs: ['Priority', 'Indicators', 'Threats'],
            images: ['Priority', 'Indicators', 'Threats']
        };
    }

    changeTab(tab) {
        this.setState({
            ...this.state,
            activeTab: tab,
            images: tab+'active'
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
        }
    }

    render() {
        return (
            <div className="App">
                <div id="Container" className="tabContentHolder">
                    <div className="tabContent">
                        {this.renderActiveTab()}
                    </div>
                </div>
                <div id ="Footer" className="tabs">
                    {this.state.tabs.map((tabName) => (
                        <div
                            className={this.state.activeTab === tabName ? 'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ 'Home' +'.png'} height={20}/><div className="imgwrap">{tabName}</div></div>
                    ))}
                </div>
            </div>

        );
    }
}

export default App;
