import React from 'react';
import './App.css';

function TabFive() {
    return (
    <div id = "Content">
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
                <div>
                    <div className="flex-container">
                        <div className="flex-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGxJREFUOI3t1KEOgDAMBNATSyqXGRz8BB9IP3RiCjmCPIeiYbabIjvVVLycuoDBCe8hItoDkVQDRURX7kdEcmEnCqpkkFRrGJGwYHM3rMiwhiMzwQlO8GfgieJGblwtSFKrZJsgT5qB/T568wAWSyFwDyoiLwAAAABJRU5ErkJggg==" alt=""></img></div>
                        <div className="flex-item"> <b>  Highest priority:</b> the most important areas for natural and cultural resources based on
                                indicator condition. This class covers 10% of the South Atlantic geography.</div>
                    </div>
                    <br/>
                    <div className="flex-container">
                        <div className="flex-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIEx2NnZGygx6OfPnw1wA9nZ2RuyGNzq5bnFyDLs7Ne7DKvYjzP8/PmzAe5CeW4xBlN2NbJduOrrcQa4C6kJRg0cNXDUwGFm4Nmvd8k25OHXV6gG/vz5s2EV+3F4EUQOQClgkQUoBQBcnCRdcyUxFQAAAABJRU5ErkJggg==" alt=""></img></div>
                        <div className="flex-item"><b>  High priority: </b>important areas for natural and cultural resources based on indicator
                         condition. This class covers an additional 15% of the South Atlantic geography; together,
                         the highest and high priority categories cover 25%.</div>
                    </div>
                    <br/>
                    <div className="flex-container">
                        <div className="flex-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIEx2NnZGygx6OfPnw1wA9nZ2Ru6E5Lr1WVlyTLs4MWLDL2b1jP8/PmzAe5CdVlZBmdDY7Jd2LtpPQPchdQEowaOGjhq4DAz8ODFi2QbcvPxY1QDf/782dC7aT28CCIHoBSwyAKUAgA94iTl61gEtQAAAABJRU5ErkJggg==" alt=""></img></div>
                        <div className="flex-item"><b>  Medium priority: </b>above-average areas for natural and cultural resources based on indicator
                        condition, capturing potential restoration opportunities. This class covers 20% of the South
                        Atlantic geography; together, the highest, high, and medium priority categories cover 45%.</div>
                    </div>
                    <br/>
                    <div className="flex-container">
                        <div className="flex-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGdJREFUOI3t1CEOwDAMA8CAScHh/UUfuDzUID8oNhtatNK0aKpRFHAy8iWbc72HqvoKRNITVFXvvd9mVsIiQgAISc+GZiattXJDAJINd+aABzzgz8CIKCNjjBkk6QBygiqZBvb7WM0DvcUmwcYVKdQAAAAASUVORK5CYII=" alt=""></img></div>
                        <div className="flex-item"><b>  Corridors: </b>connections between large patches of highest priority areas and secured lands,
                        optimized for efficiency and indicator condition in a least cost path analysis. This
                        category covers an additional 5% of the South Atlantic geography; in total, the Blueprint
                        covers 50%.</div>
                    </div>
                </div>
                <h4>Next Steps</h4>
                <h4>Basemap Credit</h4>
                <div className="flex-container">
                    <div className="flex-item"> <img src={'/images/basemap.png'} height={40} alt=""/></div>
                    <div className="flex-item"> toggle button and then text attribution</div>
                </div>
                <div className="flex-container">
                    <div className="flex-item"> <img src={'/images/basemap2.png'} height={40} alt=""/></div>
                    <div className="flex-item"> toggle button and then text attribution</div>
                </div>
                <h4>Developed By</h4>
                <p>Conservation Biology Institute</p>
    </div>

    );
}

export default TabFive;
