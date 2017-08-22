import React, {Component} from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import LabeledPercentBar from './Charts/LabeledPercentBar';


const GAP = {
    1: {
        color: '#637939',
        label: 'Permanently protected for biodiversity',
        description: ' Nature reserves, research natural areas, wilderness areas, Forever Wild easements'
    },
    2: {
        color: '#b5cf6b',
        label: 'Permanently protected to maintain a primarily natural state',
        description: ' National Wildlife Refuges, many State Parks, high-use National Parks'
    },
    3: {
        color: '#98df8a',
        label: 'Permanently secured for multiple uses and in natural cover',
        description: ' State forests, lands protected from development by forest easements'
    },
    39: {
        color: '#e7cb94',
        label: 'Permanently secured and in agriculture or maintained grass cover',
        description: ' Agricultural easements'
    },
    4: {
        color: '#d62728',
        label: 'Unsecured (already developed temporary easements and/or municipal lands)',
        description: ' Private lands with no easements, city parks, undesignated state lands '
    },
    9: {
        color: '#9edae5',
        label: 'Unknown - protected lands status unknown',
        description: 'Protection status unknown'
    }
};


const OWNERSHIP = {
    FED: {
        color: '#2ca02c',
        label: 'Federal'
    },
    STP: {
        color: '#1f77b4',
        label: 'State/province'
    },
    LOC: {
        color: '#aec7e8',
        label: 'Local'
    },
    TNC: {
        color: '#98df8a',
        label: 'The Nature Conservancy'
    },
    PNP: {
        color: '#ad494a',
        label: 'Private non-profit'
    },
    PFP: {
        color: '#ff7f0e',
        label: 'Private for-profit'
    },
    PLO: {
        color: '#d62728',
        label: 'Private land owner'
    },
    TRB: {
        color: '#9467bd',
        label: 'Tribal'
    },
    UNK: {
        color: '#c49c94',
        label: 'Ownership unknown'
    }
};

const NOT_CONSERVED = {
    color: '#D3D3D3',
    label: 'Not conserved',
    description: 'lands not currently known to be conserved'
};


function sumPercent(items) {
    return items.map((item) => item.percent).reduce((a, b) => a + b, 0);
}

function sortDescendingPercent(a, b) {
    if (a.percent < b.percent) return 1;
    if (a.percent > b.percent) return -1;
    return 0;
}

class PartnersTab extends Component {
    renderNoContent() {
        return (
            <div id = "Content">
                <h4 className="text-center">No partner information available.</h4>
            </div>
        );
    }

    renderBar(item) {
        const {key, label, percent, color} = item;

        return (
            <LabeledPercentBar key={key} percent={percent} label={label} color={color} height={6}/>
        );
    }

    renderLTALink(fips, countyName) {
        return (
            <li key={fips}>
                <a href={`http://findalandtrust.org/counties/${fips}`} target="_blank">
                    {countyName}
                </a>
            </li>
        );
    }

    renderOwnership(ownership) {
        if (!ownership.length) return null;

        return (
            <section>
                <h3>Conserved Lands Ownership</h3>
                {ownership.map(this.renderBar)}
            </section>
        );
    }

    renderProtectedLands(protectedLands) {
        if (!protectedLands.length) return null;

        return (
            <section>
                <h3>Land Protection Status</h3>
                {protectedLands.map(this.renderBar)}
            </section>
        );
    }

    renderLTAs(counties) {
        if (!counties) return null;

        return (
            <section>
                <h3>Land Trusts</h3>
                <h4>Land Trust Alliance reports by county</h4>
                <ul>
                    {Object.entries(counties).map((pair) =>
                        this.renderLTALink(pair[0], pair[1] ))}
                </ul>
            </section>
        );
    }

    render() {
        const {selectedUnit, data} = this.props;

        // Marine units currently have no info for this tab
        if (selectedUnit.indexOf('M') === 0) {
            return this.renderNoContent();
        }

        let {owner, gap, counties} = data;
        owner = owner || {};  // incoming may be undefined
        gap = gap || {};  // incoming may be undefined

        let remainder = 0;
        let ownership = [];
        let protectedLands = [];

        // transform ownership into structure needed and add
        // "not conserved" if sum is < 100%
        ownership = Object.keys(owner).map((key) => {
            return Object.assign({
                key: key,
                percent: owner[key]
            }, OWNERSHIP[key]);
        });
        ownership.sort(sortDescendingPercent);

        remainder = 100 - sumPercent(ownership);
        if (remainder > 0) {
            ownership.push(Object.assign({
                key: 'notconserved',
                percent: remainder
            }, NOT_CONSERVED));
        }

        // transform GAP (level of protection) into structure needed and add
        // "not conserved" if sum is < 100%
        protectedLands = Object.keys(gap).map((key) => {
            return Object.assign({key: key, percent: gap[key]}, GAP[key]);
        });
        protectedLands.sort(sortDescendingPercent);

        remainder = 100 - sumPercent(protectedLands);
        if (remainder > 0) {
            protectedLands.push(Object.assign({
                key: 'notconserved',
                percent: remainder
            }, NOT_CONSERVED));
        }

        if (!(ownership.length + protectedLands.length > 1 && counties)) {
            return this.renderNoContent();
        }

        return (
            <div id = "Content">
                { this.renderOwnership(ownership) }
                { this.renderProtectedLands(protectedLands) }
                { this.renderLTAs(counties) }

                {(ownership.length + protectedLands.length) > 0 &&
                    <section>
                        <h4>Credits</h4>
                        <p className="text-quiet text-small">
                            Secured Lands From TNC Eastern Division - 2014 Edition.<br/>
                            Only showing types >=10 acres.
                        </p>
                    </section>
                }
            </div>
        );
    }
}

export default PartnersTab;