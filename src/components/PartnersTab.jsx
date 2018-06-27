import React from 'react'
import PropTypes from 'prop-types'

import LabeledPercentBar from './Charts/LabeledPercentBar'
import GAP from '../config/protection.json'
import OWNERSHIP from '../config/owners.json'

const NOT_CONSERVED = {
    color: '#AAA',
    label: 'Not conserved',
    description: 'lands not currently known to be conserved'
}

function sumPercent(items) {
    return items.map(item => item.percent).reduce((a, b) => a + b, 0)
}

function sortDescendingPercent(a, b) {
    if (a.percent < b.percent) return 1
    if (a.percent > b.percent) return -1
    return 0
}

const renderBar = item => <LabeledPercentBar {...item} height={6} />

const renderLTALink = (fips, countyName) => (
    <li key={fips}>
        <a href={`http://findalandtrust.org/counties/${fips}`} target="_blank" rel="noopener noreferrer">
            {countyName}
        </a>
    </li>
)

const renderOwnership = (owner) => {
    let ownership = []
    let remainder = 0

    if (owner !== null) {
        // transform ownership into structure needed and add
        // "not conserved" if sum is < 100%
        ownership = Object.keys(owner).map(key =>
            Object.assign(
                {
                    key,
                    percent: owner[key]
                },
                OWNERSHIP[key]
            ))
        ownership.sort(sortDescendingPercent)

        remainder = 100 - sumPercent(ownership)
        if (remainder > 0) {
            ownership.push(
                Object.assign(
                    {
                        key: 'notconserved',
                        percent: remainder
                    },
                    NOT_CONSERVED
                )
            )
        }
    }

    return (
        <section>
            <h3>Conserved Lands Ownership</h3>
            {ownership.length > 0 ? (
                <React.Fragment>
                    {ownership.map(renderBar)}
                    <p className="text-small text-quieter">Only showing types greater than 10 acres.</p>
                </React.Fragment>
            ) : (
                <p className="text-small text-quieter">No information available.</p>
            )}
        </section>
    )
}

const renderProtectedLands = (gap) => {
    let remainder = 0
    let protectedLands = []

    if (gap !== null) {
        // transform GAP (level of protection) into structure needed and add
        // "not conserved" if sum is < 100%
        protectedLands = Object.keys(gap).map(key => Object.assign({ key, percent: gap[key] }, GAP[key]))
        protectedLands.sort(sortDescendingPercent)

        remainder = 100 - sumPercent(protectedLands)
        if (remainder > 0) {
            protectedLands.push(
                Object.assign(
                    {
                        key: 'notconserved',
                        percent: remainder
                    },
                    NOT_CONSERVED
                )
            )
        }
    }

    return (
        <section>
            <h3>Land Protection Status</h3>
            {protectedLands.length > 0 ? (
                <React.Fragment>
                    {protectedLands.map(renderBar)}
                    <p className="text-small text-quieter">Only showing types greater than 10 acres.</p>
                </React.Fragment>
            ) : (
                <p className="text-small text-quieter">No information available.</p>
            )}
        </section>
    )
}

const PartnersTab = ({
    counties, owner, gap, isMarine
}) => {
    // Marine areas don't have any partner info available
    if (isMarine) {
        return (
            <div id="Content" className="flex-container-column">
                <h4 className="text-center">No partner information available.</h4>
            </div>
        )
    }

    return (
        <div id="Content" className="flex-container-column">
            {renderOwnership(owner)}

            {renderProtectedLands(gap)}

            {counties && (
                <section>
                    <h3>Land Trusts By County</h3>
                    <ul>{Object.entries(counties).map(pair => renderLTALink(pair[0], pair[1]))}</ul>
                </section>
            )}
        </div>
    )
}

PartnersTab.propTypes = {
    counties: PropTypes.objectOf(PropTypes.string), // FIPS: County name, State
    gap: PropTypes.objectOf(PropTypes.number),
    owner: PropTypes.objectOf(PropTypes.number),
    isMarine: PropTypes.bool
}

PartnersTab.defaultProps = {
    counties: null,
    gap: null,
    owner: null,
    isMarine: false
}

export default PartnersTab
