import React, { Component } from 'react';
// import Whisker from './Charts/WhiskerPlot.js';
// import WhiskerDes from './Charts/WhiskerDescription';
import Ecosystem from './Ecosystem';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';

//The number of slides has to change depending on how many Ecosystems are tied to a specific watershed.
//Odd slides background color #FFFFFF
//Even slides background color #EFF3F4
const styles = {
    slide: {
        padding: 0,
        minHeight: 410,
        color: '#fff',
    },
    slide1: {
        backgroundColor: '#Ffffff',
    },
    slide2: {
        backgroundColor: '#eff3f4',
    }
};


/* Notes on how this component should work:
- props contain the ecosystems and indicators, their percents, and other dynamic data.

- this component has all the global data for indicators and ecosystems, this.
can be passed down to components using props

- this component is responsible for fusing together dynamic data and global data
for each indicator and ecosystem.

- this component is responsible for managing state of which

- this view is composed of a swipeable container of ecosystems that are present

- each ecosystem has one or more indicators

- each indicator is clickable to show the description.  When the description
is shown, the indicator takes over the full view underneath the ecosystem name
(all other indicators are hidden).

- tapping the indicator description reverts back to the regular view.

 */


class IndicatorsTab extends Component {

    state = {
        index: 0,
    };

    // handleChangeTabs = (event, value) => {
    //     this.setState({
    //         index: value,
    //     });
    // };

    handleChangeIndex = (index) => {
        this.setState({
            index,
        });
    };

    handleNavClick = (e, index) => {
        // console.log('Nav click')
        // console.log(e)
        // e.stopPropagation();
        this.handleChangeIndex(index);
    };

    getIcon(ecosystem) {
        return `/icons/${ecosystem}.svg`;
    }

    renderNav(ecosystemIDs){
        return ecosystemIDs.map((ecosystem, index)=>

                <img key={ecosystem}
                     src={this.getIcon(ecosystem)}
                     height={20}
                     alt=""
                     className={this.state.index === index ? 'active' : ''}
                     onClick={(e) => {this.handleNavClick(e, index)}}/>
        );
    }

    renderEcosystems(ecosystemIDs){
        const {ecosystems} = this.props.data;
        console.log('Ecosystems:',ecosystems);
        return ecosystemIDs.map((ecosystem, index)=>
            <Ecosystem key={ecosystem} index={index} ecosystem={ecosystem} icon={this.getIcon(ecosystem)} {...ecosystems[ecosystem]}/>
        );
    }


    render(){
        const {
            index,
        } = this.state;

        // TODO: sort ecosystems by decreasing area, so that cross-system indicators are always on the right
        let ecosystems = Object.entries(this.props.data.ecosystems);  // => [[ecosystemID, ecosystemData]...]
        ecosystems.sort((e1, e2) => {
            const p1 = e1[1].percent, p2 = e2[1].percent;
            // Some of these are null: cross system ecosystems
            if (p1 === p2) {
                // sort alphabetically
                const name1 = e1[0], name2 = e2[0];
                return name1 < name2 ? -1 : 1;
            }
            if (p1 === null || p1 === undefined) {
                return 1;
            }
            if (p2 === null || p2 === undefined) {
                return -1;
            }
            if (p1 < p2) {
                return 1;
            }
            if (p1 > p2) {
                return -1
            }

            return 0;
        });

        const ecosystemIDs = ecosystems.map((e) => e[0]);

        // TODO: use flexbox or abs positioning for nav instead of fixed, it isn't working properly

        return (
            <div id ="Content">
                {/*<h2>{this.props.data.name}</h2>*/}
                <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                   { this.renderEcosystems(ecosystemIDs) }
                </SwipeableViews>
                <div id="EcosystemsNav" className="flex-container">
                        { this.renderNav(ecosystemIDs) }
                </div>
            </div>
        );
    }
}

IndicatorsTab.propTypes = {
    //TODO
};

export default IndicatorsTab;
