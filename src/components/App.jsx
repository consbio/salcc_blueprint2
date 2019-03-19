import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

import './App.css'
import Map from './Map'

import Header from './Header'
import Sidebar from './Sidebar'
import ContentOverlay from './ContentOverlay'
import Modal from './Modal'

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
        const { isMobile, isVideoOpen, setVideoOpen } = this.props

        return (
            <div className={isMobile ? 'is-mobile' : 'is-desktop'}>
                <Header />

                {isMobile ? <ContentOverlay /> : <Sidebar />}

                <Map />

                <Modal
                    title="Blueprint Simple Viewer - Overview Video"
                    width={800}
                    open={isVideoOpen}
                    onClose={() => setVideoOpen(false)}
                >
                    {/* <iframe title="Blueprint Simple Viewer - Overview Video" width="560" height="315" src="https://www.youtube.com/embed/wSPbCiCTQOM" allowfullscreen /> */}
                    <YouTube videoId="wSPbCiCTQOM" opts={{ height: '464', width: '800' }} />
                </Modal>

                {this.renderError()}
            </div>
        )
    }
}

App.propTypes = {
    hasError: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired, // responsive browser state
    isVideoOpen: PropTypes.bool.isRequired,

    deselectUnit: PropTypes.func.isRequired,
    setVideoOpen: PropTypes.func.isRequired
}

const mapStateToProps = ({ app, browser: { isMobile } }) => ({ ...app, isMobile })

export default connect(
    mapStateToProps,
    actions
)(App)
