import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './App.css'
import Map from './Map'
import GooglePlacesSearch from './GooglePlacesSearch/GooglePlacesSearch'
import ResetIcon from './icons/ResetIcon'

import PrioritiesTab from './PrioritiesTab'
import IndicatorsTab from './IndicatorsTab'
// import ThreatsTab from './ThreatsTab';
import PartnersTab from './PartnersTab'
import InfoTab from './InfoTab'
import TabIcons from './icons/TabIcons'
import { UnitDataPropType } from '../CustomPropTypes'

import * as UnitActions from '../Actions/actions'

class App extends Component {
    constructor(props) {
        super(props)

        this.tabs = ['Priorities', 'Indicators', 'Partners'] // TODO: 'Threats'

        this.state = {
            activeTab: null,
            place: null,
            width: window.innerWidth
        }

        this.placeSearch = null
    }

    changeTab(tab) {
        // Toggle tab visibility - if already showing it, then hide again
        // TODO: only do this for the mobile viewport!
        if (tab === this.state.activeTab) {
            this.setState({
                activeTab: null
            })
        } else {
            this.setState({
                activeTab: tab
            })
        }
    }

    handleUnitSelect = (id) => {
        console.log('Select map unit: ', id) /* eslint-disable-line no-console */
        this.props.selectUnit(id)
    }

    handleUnitDeselect = () => {
        this.props.deselectUnit()
    }

    handleCloseButton = () => {
        this.props.deselectUnit()
        this.setState({ activeTab: null })
    }

    handleTryAgainClick = (event) => {
        event.preventDefault()
        this.props.deselectUnit()
    }

    handleMapClick = () => {
        if (this.placeSearch !== null) {
            this.placeSearch.blur()
        }
    }

    handlePlaceSelect = (place) => {
        this.setState({ place })
    }

    renderUnitName() {
        if (this.props.selectedUnit === null) return null

        const name = this.props.isPending ? 'Loading...' : this.props.data.name

        return (
            <div id="UnitName" className="flex-container flex-justify-center flex-align-center">
                <h1>{name}</h1>
                <ResetIcon id="CloseButton" onClick={this.handleCloseButton} />
            </div>
        )
    }

    renderTab(tab, index) {
        const active = this.state.activeTab === tab ? 'active' : ''
        const indicators = tab === 'Indicators' ? 'indicators' : ''
        const className = `tab ${active} ${indicators}`

        return (
            <div key={index} className={className} onClick={() => this.changeTab(tab)}>
                <TabIcons icon={tab} height={24} />
                <label>{tab}</label>
            </div>
        )
    }

    renderActiveTab() {
        const { data, isPending, selectedUnit } = this.props
        const { activeTab, width } = this.state

        if (isPending) return null

        if (activeTab === 'Info') return <InfoTab />

        // if there is no data, show the InfoTab if wide enough
        if (data === null) {
            if (width > 700) {
                if (selectedUnit === null) {
                    return <InfoTab />
                }
                // TODO: Why is this here?  If we are trying to route here, we should catch sooner
                console.log('Change tab to priorities')
                this.changeTab('Priorities')
            }
            return null
        }

        const { ecosystems } = data

        // if the previous state is the same tab, then close the tab
        switch (activeTab) {
            case 'Priorities':
                return <PrioritiesTab {...this.props} />
            case 'Indicators':
                return <IndicatorsTab ecosystems={ecosystems} />
            // case 'Threats':
            //     return <ThreatsTab  {...this.props}/>;
            case 'Partners':
                return <PartnersTab {...this.props} />
        }
        return null
    }

    renderFooter() {
        const { activeTab } = this.state
        const { selectedUnit, isPending } = this.props

        if (activeTab === 'Info') return null

        // Animate opacity property
        const opacity = selectedUnit === null || isPending ? 0 : 1

        return (
            <footer className="flex-container flex-justify-center" style={{ opacity }}>
                {this.tabs.map((tab, index) => this.renderTab(tab, index))}
            </footer>
        )
    }

    renderHeader() {
        const { activeTab, place, width } = this.state
        if (width > 700) {
            return (
                <header>
                    <div className="flex-container flex-justify-center flex-align-center" style={{}}>
                        <img
                            src="/logo_96x96.png"
                            style={{ height: 32, padding: 6, verticalAlign: 'middle' }}
                            alt="SALCC Logo"
                        />
                        South Atlantic Conservation Blueprint 2.2
                    </div>

                    <GooglePlacesSearch
                        ref={(ref) => {
                            this.placeSearch = ref
                        }}
                        selected={place}
                        onFocus={() => this.changeTab(null)}
                        onSelect={this.handlePlaceSelect}
                    />
                </header>
            )
        }
        return (
            <header>
                <div
                    id="InfoButton"
                    className={activeTab === 'Info' ? 'active' : ''}
                    onClick={() => this.changeTab('Info')}
                >
                    i
                </div>

                <GooglePlacesSearch
                    ref={(ref) => {
                        this.placeSearch = ref
                    }}
                    selected={place}
                    onFocus={() => this.changeTab(null)}
                    onSelect={this.handlePlaceSelect}
                />
            </header>
        )
    }

    renderError() {
        if (!this.props.hasError) return null

        return (
            <div id="FullScrim">
                <p>Oops! Something went wrong...</p>
                <p>
                    <a href="" onClick={this.handleTryAgainClick}>
                        Try again?
                    </a>
                </p>
                <p>If this does not work, try reloading this website.</p>
            </div>
        )
    }

    render() {
        const { place } = this.state
        const { selectedUnit } = this.props

        return (
            <div className="App">
                <Map
                    place={place}
                    selectedUnit={selectedUnit}
                    onSelectUnit={this.handleUnitSelect}
                    onDeselectUnit={this.handleUnitDeselect}
                    onSetLocation={this.handlePlaceSelect}
                    onClick={this.handleMapClick}
                />

                {this.renderHeader()}

                <div id="blankContent">Select a tab</div>

                {this.renderUnitName()}
                {this.renderActiveTab()}

                {this.renderFooter()}

                {this.renderError()}
            </div>
        )
    }
}

App.propTypes = {
    selectedUnit: PropTypes.string,
    deselectUnit: PropTypes.func.isRequired,
    selectUnit: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    data: UnitDataPropType
}

App.defaultProps = {
    selectedUnit: null,
    data: null
}

function mapStateToProps(state) {
    return state
}

export default connect(
    mapStateToProps,
    UnitActions
)(App)
