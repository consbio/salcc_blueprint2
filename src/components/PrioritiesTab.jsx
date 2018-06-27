import React, { Component } from 'react'

import LabeledPercentBar from './Charts/LabeledPercentBar'
import { UnitDataPropType } from '../CustomPropTypes'
import PRIORITIES from '../config/priorities.json'
import PLANS from '../config/plans.json'

class PrioritiesTab extends Component {
    renderPriority = (priority, percent) => {
        const { label, color } = PRIORITIES[priority]

        return <LabeledPercentBar key={priority} label={label} percent={percent} color={color} height={6} />
    }

    renderPlan = (plan) => {
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

    render() {
        const { data } = this.props
        const { blueprint, justification, plans } = data

        // sort priorities from highest to lowest
        const sortedPriorities = [5, 4, 3, 2, 1, 0]

        const regionalPlans = plans.filter(p => PLANS[p].type === 'regional')
        const statePlans = plans.filter(p => PLANS[p].type === 'state')
        const marinePlans = plans.filter(p => PLANS[p].type === 'marine')

        return (
            <div id="Content" className="flex-container-column">
                <section>
                    <h3>Blueprint 2.2 Priority</h3>
                    <h4>for shared conservation action</h4>
                    {sortedPriorities.map(p => this.renderPriority(p, blueprint[p]))}
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
                        <ul>{regionalPlans.map(this.renderPlan)}</ul>
                    </section>
                )}

                {statePlans.length > 0 && (
                    <section>
                        <h3>Statewide Conservation Plans</h3>
                        {statePlans.map(this.renderPlan)}
                    </section>
                )}

                {marinePlans.length > 0 && (
                    <section>
                        <h3>Marine Conservation Plans</h3>
                        {marinePlans.map(this.renderPlan)}
                    </section>
                )}
            </div>
        )
    }
}

PrioritiesTab.propTypes = {
    data: UnitDataPropType.isRequired
}

PrioritiesTab.defaultProps = {}

export default PrioritiesTab
