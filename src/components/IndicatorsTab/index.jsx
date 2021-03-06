import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'

import * as actions from '../../Actions/actions'
import { EcosystemPropType } from '../../CustomPropTypes'
import ECOSYSTEMS from '../../config/ecosystems.json'

import EcosystemHeader from './EcosystemHeader'
import Ecosystem from './Ecosystem'

class IndicatorsTab extends Component {
    state = {
        index: 0,
        ecosystemID: null, // selected ecosystem
        indicator: null // selected indicator
    }

    getIcon = ecosystem => `/icons/${ecosystem}.svg`

    handleSelectIndicator = (ecosystemID, indicator) => {
        this.setState({
            ecosystemID,
            indicator
        })
    }

    handleDeselectIndicator = () => {
        this.setState({ ecosystemID: null, indicator: null })
    }

    handleChangeIndex = (index) => {
        this.setState({ index })
    }

    sortEcosystems = (e1, e2) => {
        // Sort in decreasing percent, then alphabetically

        const p1 = e1[1].percent
        const p2 = e2[1].percent
        // Some of these are null: cross system ecosystems
        if (p1 === p2) {
            // sort alphabetically
            const name1 = e1[0]
            const name2 = e2[0]
            return name1 < name2 ? -1 : 1
        }
        if (p1 === null || p1 === undefined) {
            return 1
        }
        if (p2 === null || p2 === undefined) {
            return -1
        }
        if (p1 < p2) {
            return 1
        }
        if (p1 > p2) {
            return -1
        }

        return 0
    }

    renderNav(ecosystemIDs) {
        if (ecosystemIDs.length < 2) return null

        return (
            <div id="EcosystemsNav" className="flex-container flex-justify-center">
                {ecosystemIDs.map((ecosystem, index) => {
                    const onClick = () => this.handleChangeIndex(index)
                    return (
                        <a key={ecosystem} href="#" onClick={onClick}>
                            <img
                                src={this.getIcon(ecosystem)}
                                alt=""
                                className={this.state.index === index ? 'active' : ''}
                            />
                        </a>
                    )
                })}
            </div>
        )
    }

    render() {
        // if there is an ecosystem selected, only show that
        const { ecosystemID, indicator } = this.state
        const { ecosystems, isMobile } = this.props

        if (ecosystemID !== null) {
            const { indicators, percent } = ecosystems[ecosystemID]

            return (
                <div id="Content" className="flex-container-column">
                    <Ecosystem
                        key={ecosystemID}
                        index={0}
                        ecosystemID={ecosystemID}
                        icon={this.getIcon(ecosystemID)}
                        indicators={indicators}
                        percent={percent}
                        selectedIndicator={indicator}
                        isMobile={isMobile}
                        onSelectIndicator={i => this.handleSelectIndicator(ecosystemID, i)}
                        onDeselectIndicator={this.handleDeselectIndicator}
                    />
                </div>
            )
        }

        // sort ecosystems by decreasing area, so that cross-system indicators are always on the right
        // only keep those that have indicators
        const ecosystemIDs = Object.entries(ecosystems)
            .filter(d => d[1].indicators)
            .sort(this.sortEcosystems)
            .map(e => e[0])

        if (isMobile) {
            const { index } = this.state
            // determine current ecosytem by selected index if using swiper, otherwise it stays at first index
            const currentEcosystemID = ecosystemIDs[index]
            const { label } = ECOSYSTEMS[currentEcosystemID]
            const { percent } = ecosystems[currentEcosystemID]

            return (
                <div id="Content" className="flex-container-column">
                    <EcosystemHeader icon={this.getIcon(currentEcosystemID)} label={label} percent={percent} />
                    <div id="Ecosystems" className="flex-container-column flex-grow">
                        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                            {ecosystemIDs.map((id, i) => {
                                const { indicators } = ecosystems[id]
                                return (
                                    <Ecosystem
                                        key={id}
                                        index={i}
                                        ecosystemID={id}
                                        showHeader={false}
                                        icon={this.getIcon(id)}
                                        indicators={indicators}
                                        percent={percent}
                                        isMobile={isMobile}
                                        onSelectIndicator={selectedIndicator =>
                                            this.handleSelectIndicator(id, selectedIndicator)
                                        }
                                        onDeselectIndicator={this.handleDeselectIndicator}
                                    />
                                )
                            })}
                        </SwipeableViews>
                    </div>
                    {this.renderNav(ecosystemIDs)}
                </div>
            )
        }

        return (
            <div id="Ecosystems">
                {ecosystemIDs.map((id, i) => {
                    const { indicators, percent } = ecosystems[id]
                    return (
                        <Ecosystem
                            key={id}
                            index={i}
                            ecosystemID={id}
                            showHeader
                            icon={this.getIcon(id)}
                            indicators={indicators}
                            percent={percent}
                            isMobile={isMobile}
                            onSelectIndicator={selectedIndicator => this.handleSelectIndicator(id, selectedIndicator)}
                            onDeselectIndicator={this.handleDeselectIndicator}
                        />
                    )
                })}
            </div>
        )
    }
}

IndicatorsTab.propTypes = {
    ecosystems: PropTypes.objectOf(EcosystemPropType).isRequired,
    isMobile: PropTypes.bool.isRequired
}

const mapStateToProps = ({
    app: {
        data: { ecosystems }
    },
    browser: { isMobile }
}) => ({ ecosystems, isMobile })

export default connect(
    mapStateToProps,
    actions
)(IndicatorsTab)
