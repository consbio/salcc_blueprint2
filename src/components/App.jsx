import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './App.css'
import Map from './Map'

import Header from './Header'
import Sidebar from './Sidebar'
import ContentOverlay from './ContentOverlay'
import { PlacePropType } from '../CustomPropTypes'
import * as actions from '../Actions/actions'

class App extends Component {
    constructor(props) {
        super(props)

        this.placeSearch = null
    }

    handleUnitSelect = (id) => {
        console.log('Select map unit: ', id) /* eslint-disable-line no-console */
        const {
            isMobile, activeTab, selectUnit, setTab
        } = this.props
        if (!(isMobile || activeTab)) {
            setTab('Priorities')
        }
        selectUnit(id)
    }

    handleUnitDeselect = () => {
        this.props.deselectUnit()
    }

    handleCloseButton = () => {
        this.props.deselectUnit()
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
        const {
            place, setPlace, selectedUnit, isMobile
        } = this.props

        return (
            <div className={isMobile ? 'is-mobile' : 'is-desktop'}>
                <Header />

                {isMobile ? <ContentOverlay /> : <Sidebar />}

                <Map
                    isMobile={isMobile}
                    place={place}
                    selectedUnit={selectedUnit}
                    allowDeselect={isMobile}
                    onSelectUnit={this.handleUnitSelect}
                    onDeselectUnit={this.handleUnitDeselect}
                    onSetLocation={setPlace}
                    onClick={this.handleMapClick}
                />

                {this.renderError()}
            </div>
        )
    }
}

App.propTypes = {
    activeTab: PropTypes.string,
    selectedUnit: PropTypes.string,
    hasError: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired, // responsive browser state
    place: PlacePropType,

    setTab: PropTypes.func.isRequired,
    deselectUnit: PropTypes.func.isRequired,
    selectUnit: PropTypes.func.isRequired,
    setPlace: PropTypes.func.isRequired
}

App.defaultProps = {
    activeTab: null,
    selectedUnit: null,
    place: null
}

const mapStateToProps = ({ app, browser: { isMobile } }) => ({ ...app, isMobile })

export default connect(
    mapStateToProps,
    actions
)(App)
