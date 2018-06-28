import React from 'react'
import PropTypes from 'prop-types'
import LabeledPercentBar from '../Charts/LabeledPercentBar'
import PRIORITIES from '../../config/priorities.json'
import PLANS from '../../config/plans.json'

// sort priorities from highest to lowest
const SORTED_PRIORITIES = [5, 4, 3, 2, 1, 0]

const renderPriority = (priority, percent) => {
    const { label, color } = PRIORITIES[priority]

    return <LabeledPercentBar key={priority} label={label} percent={percent} color={color} height={6} />
}

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

const PrioritiesTab = ({ blueprint, justification, plans }) => {
    console.log('priorites tab')
    const regionalPlans = plans.filter(p => PLANS[p].type === 'regional')
    const statePlans = plans.filter(p => PLANS[p].type === 'state')
    const marinePlans = plans.filter(p => PLANS[p].type === 'marine')

    console.log('before return')

    return (
        <div id="Content" className="flex-container-column">
            <section>
                <h3>Blueprint 2.2 Priority</h3>
                <h4>for shared conservation action</h4>
                {SORTED_PRIORITIES.map(p => renderPriority(p, blueprint[p]))}
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
    plans: PropTypes.arrayOf(PropTypes.string)
}

PrioritiesTab.defaultProps = {
    justification: null,
    plans: []
}

export default PrioritiesTab
