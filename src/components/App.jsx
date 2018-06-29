import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './App.css'
import Map from './Map'
// import GooglePlacesSearch from './GooglePlacesSearch/GooglePlacesSearch'

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


    // renderHeader() {
    //     const {
    //         activeTab, isMobile, place, setPlace, setTab
    //     } = this.props

    //     if (isMobile) {
    //         const handleInfoClick = () => this.handleSetTab('Info')

    //         // hide current tab so that we can show the point on the map
    //         const handleSetPlace = (newPlace) => {
    //             setTab(null)
    //             setPlace(newPlace)
    //         }

    //         return (
    //             <header>
    //                 <div id="InfoButton" className={activeTab === 'Info' ? 'active' : ''} onClick={handleInfoClick}>
    //                     i
    //                 </div>

    //                 <GooglePlacesSearch
    //                     ref={(ref) => {
    //                         this.placeSearch = ref
    //                     }}
    //                     selected={place}
    //                     onSelect={handleSetPlace}
    //                 />
    //             </header>
    //         )
    //     }

    //     return (
    //         <header>
    //             <div className="flex-container flex-justify-center flex-align-center">
    //                 <img
    //                     src="/logo_96x96.png"
    //                     style={{ height: 32, padding: 6, verticalAlign: 'middle' }}
    //                     alt="SALCC Logo"
    //                 />
    //                 South Atlantic Conservation Blueprint 2.2
    //             </div>

    //             <GooglePlacesSearch
    //                 ref={(ref) => {
    //                     this.placeSearch = ref
    //                 }}
    //                 selected={place}
    //                 onSelect={setPlace}
    //             />
    //         </header>
    //     )
    // }

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

                {isMobile ? (
                    <ContentOverlay />
                ) : (
                    <Sidebar />
                )}

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
    // isPending: PropTypes.bool.isRequired,
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
