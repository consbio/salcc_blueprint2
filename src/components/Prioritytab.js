import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function TabOne({data}) {
    const colors = [
        "#D3D3D3",
        "gray",
        "#FAB3BA",
        "#C40988",
        "#4A0068"
    ];
    const position = [
        0,
        data.blueprint[0]*2,
        data.blueprint[0]*2+data.blueprint[1]*2,
        data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2,
        data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2+data.blueprint[3]*2,
        data.blueprint[0]*2+data.blueprint[1]*2+data.blueprint[2]*2+data.blueprint[3]*2+data.blueprint[4]*2
    ];
    return (
        <div id = "Content">
        <h2>{data.name}</h2>
            <svg width="100%" height="220">
                {
                    data.blueprint.map((num, i)=>
                    <rect x="0" y={position[i]} width="520" height={num*2} fill = {colors[i]}/>
                )}
            </svg>
            <div>
                <div className="flex-container2">
                        <div className="flex-item2"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGxJREFUOI3t1KEOgDAMBNATSyqXGRz8BB9IP3RiCjmCPIeiYbabIjvVVLycuoDBCe8hItoDkVQDRURX7kdEcmEnCqpkkFRrGJGwYHM3rMiwhiMzwQlO8GfgieJGblwtSFKrZJsgT5qB/T568wAWSyFwDyoiLwAAAABJRU5ErkJggg==" alt=""></img></div>
                        <div className="flex-item2"> <b>  Highest priority {data.blueprint[4]} %</b></div>
                </div>
                <div className="flex-container2">
                    <div className="flex-item2"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIEx2NnZGygx6OfPnw1wA9nZ2RuyGNzq5bnFyDLs7Ne7DKvYjzP8/PmzAe5CeW4xBlN2NbJduOrrcQa4C6kJRg0cNXDUwGFm4Nmvd8k25OHXV6gG/vz5s2EV+3F4EUQOQClgkQUoBQBcnCRdcyUxFQAAAABJRU5ErkJggg==" alt=""></img></div>
                    <div className="flex-item2"><b>  High priority {data.blueprint[3]} %</b></div>
                </div>
                <div className="flex-container2">
                    <div className="flex-item2"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIEx2NnZGygx6OfPnw1wA9nZ2Ru6E5Lr1WVlyTLs4MWLDL2b1jP8/PmzAe5CdVlZBmdDY7Jd2LtpPQPchdQEowaOGjhq4DAz8ODFi2QbcvPxY1QDf/782dC7aT28CCIHoBSwyAKUAgA94iTl61gEtQAAAABJRU5ErkJggg==" alt=""></img></div>
                    <div className="flex-item2"><b>  Medium priority {data.blueprint[2]} %</b></div>
                </div>
                <div className="flex-container2">
                    <div className="flex-item2"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAGdJREFUOI3t1CEOwDAMA8CAScHh/UUfuDzUID8oNhtatNK0aKpRFHAy8iWbc72HqvoKRNITVFXvvd9mVsIiQgAISc+GZiattXJDAJINd+aABzzgz8CIKCNjjBkk6QBygiqZBvb7WM0DvcUmwcYVKdQAAAAASUVORK5CYII=" alt=""></img></div>
                    <div className="flex-item2"><b>  Corridors {data.blueprint[1]} %</b></div>
                </div>
            </div>
            <h4>Justification</h4>
            <p>{data.justification}</p>

        </div>
    );
}

TabOne.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        blueprint: PropTypes.array,
        justification: PropTypes.string,
        name: PropTypes.string
    })
}

export default TabOne;
