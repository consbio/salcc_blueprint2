import React, {Component} from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import LabeledPercentBar from './Charts/LabeledPercentBar';


const GAP = {
    1: {
        color: '#637939',
        label: 'Permanent protection for biodiversity',
        description: ' Nature reserves, research natural areas, wilderness areas, Forever Wild easements'
    },
    2: {
        color: '#b5cf6b',
        label: 'Permanent protection to maintain a primarily natural state',
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
        label: 'Unknown - protection status unknown',
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


class PartnersTab extends Component {
    sortDescendingPercent(a, b) {
        if (a.percent < b.percent) return 1;
        if (a.percent > b.percent) return -1;
        return 0;
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

    render() {
        const {owner, gap, counties} = this.props.data;

        // transform ownership
        let ownership = [];
        if (owner) {
            ownership = Object.keys(owner).map((key) => {
                return Object.assign({key: key, percent: owner[key]}, OWNERSHIP[key]);
            });

            ownership.sort(this.sortDescendingPercent);
        }

        // transform GAP
        let protection = [];
        if (gap) {
            protection = Object.keys(gap).map((key) => {
                return Object.assign({key: key, percent: gap[key]}, GAP[key]);
            });

            protection.sort(this.sortDescendingPercent);
        }

        return (
            <div id = "Content">
                {ownership.length > 0 &&
                    <section>
                        <h3>Conserved Lands Ownership</h3>
                        {ownership.map(this.renderBar)}
                    </section>
                }

                {protection.length > 0 &&
                    <section>
                        <h3>Land Protection Status</h3>
                        {protection.map(this.renderBar)}
                    </section>
                }

                {counties &&
                    <section>
                        <h3>Land Trusts</h3>
                        <ul>
                            {Object.entries(counties).map((pair) =>
                                this.renderLTALink(pair[0], pair[1] ))}
                        </ul>
                    </section>
                }

                {(ownership.length + protection.length) > 0 &&
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