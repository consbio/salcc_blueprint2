import React from 'react';
import indicators from '../../configindica';

function WhiskerDes({indicatordes, name}) {
    return (
        <div>
            lots of text here and a table below
            <ul>
                {Object.keys(indicators[indicatordes]).map((indica, j)=>
                    <li key={j}>{indica + ': '+ indicators[indicatordes][indica]} </li>
                )}
            </ul>

        </div>

    );
}

export default WhiskerDes;
