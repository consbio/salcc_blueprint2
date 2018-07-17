import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PieChart from 'react-minimal-pie-chart'

import { formatPercent } from '../../utils'
import PRIORITIES from '../../config/priorities.json'
import PLANS from '../../config/plans.json'

// sort priorities from highest to lowest
const INLAND_PRIORITIES = [5, 4, 3, 2, 1, 0]
const MARINE_PRIORITIES = [5, 4, 3, 2, 0]

const renderPlan = (plan) => {
    const { label, url } = PLANS[plan]

    if (url !== null) {
        return (
            <li key={plan}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {label}
                </a>
            </li>
        )
    }

    return <li key={plan}>{label}</li>
}

const PrioritiesTab = ({
    blueprint, justification, plans, isMarine
}) => {
    const regionalPlans = plans.filter(p => PLANS[p].type === 'regional')
    const statePlans = plans.filter(p => PLANS[p].type === 'state')
    const marinePlans = plans.filter(p => PLANS[p].type === 'marine')
    const priorities = isMarine ? MARINE_PRIORITIES : INLAND_PRIORITIES
    const chartData = priorities
        .map(p => ({
            value: blueprint[p],
            label: PRIORITIES[p].label,
            color: PRIORITIES[p].color
        }))
        .filter(p => p.value > 0)

    return (
        <div id="Content" className="flex-container-column">
            <section>
                <h3>Blueprint 2.2 Priority</h3>
                <h4>for shared conservation action</h4>
                <div className="chart-pie flex-container flex-align-center">
                    <PieChart data={chartData} style={{ width: 200 }} />
                    <div className="chart-pie-legend">
                        {chartData.map(priority => (
                            <div key={priority.label} className="chart-pie-legend-row flex-container flex-align-center">
                                <div className="chart-pie-legend-patch" style={{ backgroundColor: priority.color }} />
                                <div className="chart-pie-legend-label text-smaller">
                                    {priority.label}
                                    <span className="text-quieter text-small"> ({formatPercent(priority.value)}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {justification && (
                <section>
                    <h3>Blueprint 1.0 Workshop Feedback</h3>
                    <p>{justification}</p>
                </section>
            )}

            {regionalPlans.length > 0 && (
                <section>
                    <h3>Regional Conservation Plans</h3>
                    <ul>{regionalPlans.map(renderPlan)}</ul>
                </section>
            )}

            {statePlans.length > 0 && (
                <section>
                    <h3>Statewide Conservation Plans</h3>
                    {statePlans.map(renderPlan)}
                </section>
            )}

            {marinePlans.length > 0 && (
                <section>
                    <h3>Marine Conservation Plans</h3>
                    {marinePlans.map(renderPlan)}
                </section>
            )}
        </div>
    )
}

PrioritiesTab.propTypes = {
    blueprint: PropTypes.arrayOf(PropTypes.number).isRequired,
    justification: PropTypes.string,
    plans: PropTypes.arrayOf(PropTypes.string),
    isMarine: PropTypes.bool.isRequired
}

PrioritiesTab.defaultProps = {
    justification: null,
    plans: []
}

const mapStateToProps = ({ app }) => {
    const { data, selectedUnit } = app
    const { blueprint, justification, plans } = data
    return {
        blueprint,
        justification,
        plans,
        isMarine: !!(selectedUnit && selectedUnit.indexOf('M') === 0)
    }
}

export default connect(mapStateToProps)(PrioritiesTab)
