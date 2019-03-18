/* eslint-disable max-len */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../Actions/actions'
import ResetIcon from './icons/outline-cancel-24px.svg'
import OutlineContactIcon from './icons/outline-email-24px.svg'
import OutlineFeedbackIcon from './icons/outline-feedback-24px.svg'

import Modal from './Modal'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { contactOpen: false, feedbackOpen: false }
    }

    handleContactClick = (e) => {
        e.preventDefault()
        this.setState({ contactOpen: true })
    }
    handleFeedbackClick = (e) => {
        e.preventDefault()
        this.setState({ feedbackOpen: true })
    }
    handleModalClose = () => {
        this.setState({ contactOpen: false, feedbackOpen: false })
    }

    render() {
        const {
            isMobile, hasSelectedUnit, unitName, deselectUnit, setTab
        } = this.props

        const { contactOpen, feedbackOpen } = this.state

        const showUnit = isMobile && hasSelectedUnit

        const handleDeselectUnit = () => {
            setTab('Map')
            deselectUnit()
        }

        return (
            <React.Fragment>
                <header className="flex-container flex-justify-center flex-align-center">
                    {showUnit ? (
                        <React.Fragment>
                            <h1 className="flex-grow">{unitName}</h1>
                            <ResetIcon id="CloseButton" onClick={handleDeselectUnit} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <img src="/logo_96x96.png" alt="South Atlantic Logo" />
                            <div className="flex-grow">
                                <a href="http://www.southatlanticlcc.org/blueprint/" target="_blank" rel="noopener noreferrer">
                                    {isMobile && <h4>South Atlantic</h4>}
                                    <h1>{`${!isMobile ? 'South Atlantic ' : ''}Conservation Blueprint 2.2`}</h1>
                                </a>
                            </div>
                            {!isMobile && (
                                <div id="ContactButtons">
                                    <div className="button" onClick={this.handleFeedbackClick}>
                                        <OutlineFeedbackIcon height={20} fill="#AAA" />
                                        Feedback
                                    </div>
                                    <div className="button" onClick={this.handleContactClick}>
                                        <OutlineContactIcon height={20} fill="#AAA" />
                                        Contact Staff
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    )}
                </header>

                {!isMobile && (
                    <React.Fragment>
                        <Modal
                            title="Give your feedback to Blueprint staff"
                            width={600}
                            open={feedbackOpen}
                            onClose={this.handleModalClose}
                        >
                            <p>
                                The Blueprint and indicators are regularly revised based on input from people like you.
                                Have a suggestion on how to improve the priorities? Let us know! We also welcome
                                feedback on how to improve the Simple Viewer interface. South Atlantic staff will read
                                and respond to your comments&mdash;we promise.
                                <br />
                                <br />
                                <b>email</b>{' '}
                                <a
                                    href="mailto:hilary_morris@fws.gov?subject=South Atlantic Blueprint Feedback (Simple Viewer)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    hilary_morris@fws.gov
                                </a>
                                <br />
                                <b>call</b> <a href="tel:19197070252">(919) 707-0252</a>
                            </p>
                        </Modal>

                        <Modal
                            title="Contact Blueprint staff for help using the Blueprint"
                            width={600}
                            open={contactOpen}
                            onClose={this.handleModalClose}
                        >
                            <p>
                                Do you have a question about the Blueprint? Would you like help using the Blueprint to
                                support a proposal or inform a decision? South Atlantic staff are here to support you!
                                We really mean it. It&apos;s what we do!
                                <br />
                                <br />
                                <b>email</b>{' '}
                                <a
                                    href="mailto:hilary_morris@fws.gov?subject=South Atlantic Blueprint Support (Simple Viewer)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    hilary_morris@fws.gov
                                </a>
                                <br />
                                <b>call</b> <a href="tel:19197070252">(919) 707-0252</a>
                            </p>
                        </Modal>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

Header.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    hasSelectedUnit: PropTypes.bool.isRequired,
    unitName: PropTypes.string.isRequired,
    deselectUnit: PropTypes.func.isRequired,
    setTab: PropTypes.func.isRequired
}

const mapStateToProps = ({ app, browser: { isMobile } }) => {
    const {
        selectedUnit, setTab, data, deselectUnit
    } = app
    return {
        isMobile,
        hasSelectedUnit: selectedUnit !== null,
        unitName: data && data.name ? data.name : 'Loading...',
        deselectUnit,
        setTab
    }
}

export default connect(
    mapStateToProps,
    actions
)(Header)
