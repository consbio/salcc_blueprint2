import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
//import {selectUnit, fetchData, deselectUnit} from '../Actions/actions';
import * as UnitActions from '../Actions/actions';

class App extends Component {
    ///////////////////////////////////////
    static propTypes = {
        selectedUnit: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount(){
        const { fetchData, selectedUnit} = this.props
        fetchData(selectedUnit);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedUnit !== this.props.selectedUnit){
            const { fetchData, selectedUnit } = nextProps
            fetchData(selectedUnit);
        }
    }

    handleChange = nextUnit => {
        this.props.selectUnit(nextUnit)
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const { deselectUnit, fetchData, selectedUnit} = this.props
        deselectUnit(selectedUnit);
        fetchData(selectedUnit);
    }
////////////////////////////

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
        const { selectedUnit, dataByUnit} = this.props;
        switch (this.state.activeTab) {//if the previous state is the same tab, then close the tab
            case 'Priority':
                return <TabOne data={dataByUnit[selectedUnit].items}/> //<TabOne data = {data}/>
            case 'Indicators':
                return <TabTwo /> //data = {data}
            case 'Threats':
                return <TabThree /> //data = {data}
            case 'Partners':
                return <TabFour /> //data =
            case 'Home':
                return <TabFive />
            case 'Contact':
                return <TabSix />
            case null:
                return null;
        }
    }

    render() {
        return (
            <div className="App">
                <Map />

                <div id="TopBar" className="toptabs">
                    {this.state.toptabs.map((tabName, index) => (
                        <div key={index}
                            className={(this.state.activeTab !== null && this.state.activeTab === tabName) ?'tab active' : 'tab'}
                            onClick={() => this.changeTab(tabName)}><img src ={'/images/'+ ((this.state.activeTab !== null && this.state.activeTab === tabName) ? tabName+'active' : tabName) +'.png'} height={20} alt=""/><div className="imgwrap">{tabName}</div></div>
                    ))}
                      <Geonames />
                </div>

                { this.renderActiveTab() }

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

//function mapDispatchToProps(dispatch) {
//    return bindActionCreators({ selectedUnit: selectUnit}, dispatch);
//}

export default connect(
    mapStateToProps,
    UnitActions
)(App);
