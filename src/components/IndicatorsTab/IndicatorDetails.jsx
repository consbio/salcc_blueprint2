import React from 'react'
import PropTypes from 'prop-types'

import LabeledPercentBar from '../Charts/LabeledPercentBar'
import { formatPercent } from '../../utils'

const IndicatorDetails = ({
    label,
    description,
    caption,
    valueLabels,
    percent,
    ecosystemIcon,
    isMobile,
    datasetID,
    goodThreshold,
    onBackClick
}) => {
    const handleBackClick = (event) => {
        event.preventDefault()
        onBackClick()
    }

    const percents = Object.keys(valueLabels).map((value, i) => ({
        value,
        label: valueLabels[value],
        percent: percent[i]
    }))
    percents.reverse()

    const hasGoodThreshold = goodThreshold !== null
    let goodPercents = null
    let notGoodPercents = null
    let totalGoodPercent = 0
    let totalNotGoodPercent = 0
    if (hasGoodThreshold) {
        goodPercents = percents.filter(p => p.value >= goodThreshold)
        notGoodPercents = percents.filter(p => p.value < goodThreshold)
        totalGoodPercent = goodPercents.reduce((total, p) => total + p.percent, 0)
        totalNotGoodPercent = notGoodPercents.reduce((total, p) => total + p.percent, 0)
    }

    return (
        <React.Fragment>
            <div
                id="IndicatorDetailsHeader"
                className="ecosystem-header flex-container flex-justify-start flex-align-center"
                onClick={handleBackClick}
            >
                <a href="">&lt;&lt;</a>
                <img src={ecosystemIcon} alt="" />
                <h3>{label}</h3>
            </div>
            <div id="IndicatorDetails" className="flex-container-column">
                <p>{description}</p>
                <div>
                    {hasGoodThreshold ? (
                        <div>
                            <div className="indicator-detail-charts">
                                {goodPercents.map((entry, i) => (
                                    <div className="flex-container" key={entry.value}>
                                        <div className="indicator-chart-heading">{i === 0 ? 'High:' : ''}</div>
                                        <LabeledPercentBar
                                            className="text-quiet"
                                            {...entry}
                                            height={6}
                                        />
                                    </div>
                                ))}

                                <div className="indicator-good-condition-divider">
                                    <div className="text-quieter text-smaller text-center">
                                        &uarr; {formatPercent(totalGoodPercent)}% in good condition
                                    </div>
                                    <div className="divider" />
                                    <div className="text-quieter text-smaller text-center">
                                        &darr; {formatPercent(totalNotGoodPercent)}% not in good condition
                                    </div>
                                </div>

                                {notGoodPercents.map((entry, i) => (
                                    <div className="flex-container" key={entry.value}>
                                        <div className="indicator-chart-heading">
                                            {i === notGoodPercents.length - 1 ? 'Low:' : ''}
                                        </div>
                                        <LabeledPercentBar
                                            className="text-quiet"
                                            {...entry}
                                            height={6}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="indicator-detail-charts">
                            {percents.map((entry, i) => {
                                let heading = ''
                                if (i === 0) {
                                    heading = 'High:'
                                } else if (i === percents.length - 1) {
                                    heading = 'Low:'
                                }

                                return (
                                    <div className="flex-container" key={entry.value}>
                                        <div className="indicator-chart-heading">{heading}</div>
                                        <LabeledPercentBar
                                            className="text-quiet"
                                            {...entry}
                                            height={6}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {caption && (
                    <p className="text-small text-quiet indicator-details-caption">
                        {caption}
                    </p>
                )}

                {!isMobile &&
                    datasetID && (
                    <p className="indicator-dataset-link">
                        <a
                            href={`https://salcc.databasin.org/datasets/${datasetID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View this indicator in the Conservation Planning Atlas"
                        >
                                View this indicator in the Conservation Planning Atlas
                        </a>
                    </p>
                )}
            </div>
        </React.Fragment>
    )
}

IndicatorDetails.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    valueLabels: PropTypes.objectOf(PropTypes.string).isRequired,
    percent: PropTypes.arrayOf(PropTypes.number).isRequired,
    ecosystemIcon: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired,

    datasetID: PropTypes.string,
    caption: PropTypes.string,
    goodThreshold: PropTypes.number // values >= goodThreshold are considered in "good" condition
}

IndicatorDetails.defaultProps = {
    datasetID: null,
    caption: null,
    goodThreshold: null
}

export default IndicatorDetails
