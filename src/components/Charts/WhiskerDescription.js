import React from 'react';
import indicators from '../../configindica';
import Indicator from '../Indicator';
import '../App.css'

function WhiskerDes(props){
    console.log("whiskerdes" + props.indicatorTitle.props);
    return (
        <div onClick={props.onClick}>
            <Indicator key = {props.indicatorTitle.id} {...props.indicatorTitle} />
            <br/>
            <p>{props.indicatorTitle.description}</p>
            <br/>
            <table>
                <tr>
                    <th>Value</th>
                    <th>blank</th>
                    <th>% of Area</th>
                </tr>
                <tr>
                    <th>one</th>
                    <th>test</th>
                    <th>two</th>
                </tr>
            </table>
            <ul>
                {/*Object.keys(indicators[indicatordes]).map((indica, j)=>
                    <li key={j}>{indica + ': '+ indicators[indicatordes][indica]} </li>
                )*/}
            </ul>

        </div>

    );
}

export default WhiskerDes;
