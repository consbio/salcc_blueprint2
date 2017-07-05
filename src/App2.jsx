import React, {Component} from 'react';
// import './components/Geonames.css';
import Geonames from './components/Geonames';

class App extends Component {
    toptabs = [
        '',
        '',
        '',
        '',
        'Home',
        'Contact'
    ]
    tabs = [
        'Priorities',
        'Indicators',
        'Threats',
        'Partners'
    ]

    state = {
        selected: null,
        showTabs: false
    }

    onClick = (event) => {
        let id = parseInt(event.currentTarget.dataset.id, 10);
        console.log('setstate', id)
        // if this matches previous tab, deselect it
        this.setState({selected: (this.state.selected === id)? null: id});
    }

    onContainerClick = (event) => {
        console.log('on contentClick')
        this.setState({showTabs: !this.state.showTabs});
    }

    render() {
        return (
            <div id="Container">
                <div id="TopBar">
                    {
                        this.toptabs.map((toptab, y) => {
                            let images = toptab;
                            let className = 'button';
                            if (this.state.selected === y){
                                className += ' active';
                                images = toptab + 'active';
                            }

                            if(y >= 4) {
                                return <div key={y + 4} className={className} data-id={y} onClick={this.onClick}><img
                                    src={'/images/' + images + '.png'} height={20}/>
                                    <div className="imgwrap">{toptab}</div>
                                </div>
                            }
                        })
                    }
                    {/*<div className="button" onClick={this.onClick}><img src ={'./images/Home.png'} height={20}/><div className="imgwrap">Home</div></div>
                    <div className="button" onClick={this.onClick}><img src ={'./images/Contact.png'} height={20}/><div className="imgwrap">Contact</div></div>*/}
                    <Geonames />
                </div>


                {/*Toggle visibility based on bottom tabs*/}
                <div id="Content" className={(this.toptabs[this.state.selected] === 'Home')? 'active': ''}>
                    <h2>Welcome to the Blueprint 2.1 Simple Viewer for Mobile</h2>

                    <p>
                        <br/>
                        The Simple Viewer summarizes the South Atlantic Conservation Blueprint at a subwatershed
                        and marine lease block scale. You’ll also find information about ecosystem indicators, land
                        cover, and protection status.
                        <br/><br/>
                        The Conservation Blueprint is a living spatial plan to conserve natural and cultural resources
                        for future generations. Blueprint 2.1 identifies priority areas for shared conservation action
                        based on ecosystem indicator condition and connectivity. More than 400 people from over 100
                        different organizations have actively participated in its development so far.
                        <br/><br/>
                    </p>

                    <h4>Reason for priority in Blueprint 2.1</h4>
                    <p>
                        Blueprint 2.1 is completely data-driven, based on ecosystem indicator models and a connectivity
                        analysis. It prioritizes the lands and waters of the South Atlantic according to the current
                        condition of the indicators. Better indicator condition suggests higher ecosystem integrity and
                        higher importance for natural and cultural resources across all ecosystems collectively.
                        <br/><br/>
                    </p>
                    <h4>Priority Categories</h4>
                    <ul>
                        <li><font color="purple">Highest Priority:</font>  the most important areas for natural and cultural resources based on
                             indicator condition. This class covers 10% of the South Atlantic geography.</li>
                        <li><font color="hotpink">High Priority:</font>  important areas for natural and cultural resources based on indicator
                             condition. This class covers an additional 15% of the South Atlantic geography; together,
                             the highest and high priority categories cover 25%.</li>
                        <li><font color="pink">Medium Priority:</font> above-average areas for natural and cultural resources based on indicator
                            condition, capturing potential restoration opportunities. This class covers 20% of the South
                            Atlantic geography; together, the highest, high, and medium priority categories cover 45%.
                        </li>
                        <li>Corridors: connections between large patches of highest priority areas and secured lands,
                            optimized for efficiency and indicator condition in a least cost path analysis. This
                            category covers an additional 5% of the South Atlantic geography; in total, the Blueprint
                            covers 50%.</li>
                     </ul>
                    <h4>Basemap Credit</h4>
                    <p><img src={'/images/basemap.png'} height={40}/> Image of toggle button and then text attribution
                        <br/><br/>
                    </p>
                    <h4>Developed By</h4>
                    <p>Conservation Biology Institute</p>
                </div>
                <div id="Content" className={(this.toptabs[this.state.selected] === 'Contact')? 'active': ''}>
                    <h2>Give Us Feedback!</h2>

                    <p>
                        <br/>
                         some sort of image
                        Friendly paragraph
                        make the email a hyperlink
                        <br/><br/>
                        Email us at: southatlanticlcc@gmail.com
                        <br/><br/>
                    </p>
                    <h4>See who else is using the Blueprint!</h4>
                </div>
                <div id="Content" className={(this.state.selected !== null && this.tabs[this.state.selected] === 'Priorities')? 'active': ''}>
                    <h2>Watershed name</h2>

                    <p>
                        <br/><br/>
                        Pie chart
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas tincidunt
                        sollicitudin. Phasellus id ipsum non tortor varius semper. Suspendisse id lorem quis turpis
                        aliquet convallis non quis nisi. Nunc maximus risus magna, ac viverra nisl pretium ac.
                        Suspendisse et enim sit amet massa maximus lacinia. Nunc aliquam nunc ultrices ultrices tempor.
                        Nam orci tortor, ultrices ut odio at, congue cursus enim. Nunc sed tempor lacus, eget mollis
                        lectus.
                        <br/><br/>
                    </p>
                </div>
                 <div id="Content" className={(this.state.selected !== null && this.tabs[this.state.selected] === 'Indicators')? 'active': ''}>
                    <h2>Watershed name</h2>
                     <br/>
                    <h4>Ecosystem</h4>
                    <p>
                        Whisker Plots
                        <br/><br/>
                        Need the bottom navigation bar here
                    </p>
                </div>
                 <div id="Content" className={(this.state.selected !== null && this.tabs[this.state.selected] === 'Threats')? 'active': ''}>
                    <h2>Watershed name</h2>
                    <br/>
                    <h4>Urbanization</h4>
                    <p>
                        First graph
                    </p>
                     <br/><br/>
                     <h4>Sea Level Rise</h4>
                    <p>
                        Second graph
                    </p>
                </div>
                 <div id="Content" className={(this.state.selected !== null && this.tabs[this.state.selected] === 'Partners')? 'active': ''}>
                    <h2>Watershed name</h2>
                    <br/>
                    <h4>Conserved Lands Ownership</h4>
                    <p>
                        <br/>
                        Pie Chart
                        <br/><br/>
                        Legend
                        <br/>
                    </p>
                     <h4>Land Protection Status</h4>
                     <p>
                         <br/>
                        Pie Chart
                        <br/><br/>
                        Legend
                         <br/>
                    </p>
                     <h4>Regional Conservation Plans</h4>
                     <ul>
                         <li>One link</li>
                         <li>Two link</li>
                         <li>Three link</li>
                     </ul>
                     <h4>Land Trusts</h4>
                     <ul>
                         <li>One link</li>
                         <li>Two link</li>
                     </ul>
                </div>

                <div id="Footer" className={(this.state.showTabs)? 'active': ''}>
                    {
                        this.tabs.map((tab, i) => {
                            let images = tab;
                            let className = 'button';
                            if (this.state.selected === i){
                                className += ' active';
                                images = tab + 'active';
                            }


                            return <div key={i} className={className} data-id={i} onClick={this.onClick}><img src ={'/images/'+ images +'.png'} height={20}/><div className="imgwrap">{tab}</div></div>
                        })
                    }


                </div>


            </div>
        );
    }
}


export default App;
