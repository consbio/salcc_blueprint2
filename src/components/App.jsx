import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './App.css'
import Map from './Map'

import Header from './Header'
import Sidebar from './Sidebar'
import ContentOverlay from './ContentOverlay'
import * as actions from '../Actions/actions'

class App extends Component {
    handleTryAgainClick = (event) => {
        event.preventDefault()
        this.props.deselectUnit()
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
        const { isMobile } = this.props

        return (
            <div className={isMobile ? 'is-mobile' : 'is-desktop'}>
                <Header />

                {isMobile ? <ContentOverlay /> : <Sidebar />}

                <Map />

                {this.renderError()}
            </div>
        )
    }
}

App.propTypes = {
    hasError: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired, // responsive browser state

    deselectUnit: PropTypes.func.isRequired
}

const mapStateToProps = ({ app, browser: { isMobile } }) => ({ ...app, isMobile })

export default connect(
    mapStateToProps,
    actions
)(App)
