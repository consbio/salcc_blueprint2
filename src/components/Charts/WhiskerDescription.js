import React from 'react';
import indicators from '../../configindica';
import Indicator from '../Indicator';
import '../App.css'

function WhiskerDes(props){
    console.log("whiskerdes" + props.indicatorTitle.valueLabels);
    return (
        <div onClick={props.onClick}>
            <Indicator key = {props.indicatorTitle.id} {...props.indicatorTitle} />
            <br/>
            <p>{props.indicatorTitle.description}</p>
            <br/>
            <table>
                <tr>
                    <th>Value</th>
                    <th>_____</th>
                    <th>% of Area</th>
                </tr>
                {Object.keys(props.indicatorTitle.valueLabels).slice(0).reverse().map((indica, j)=>
                    <tr>
                        <td>{indica}</td>
                        <td>{props.indicatorTitle.valueLabels[indica]}</td>
                        <td>{parseInt(props.indicatorTitle.percent[j])}%</td>
                    </tr>
                )}
            </table>

        </div>

    );
}

export default WhiskerDes;
