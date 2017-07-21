import React from 'react';
import PropTypes from 'prop-types';

function TabFour({data}) {
    return (
      <div id = "Content">
                    <h2>{data.name}</h2>
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

    );
}

TabFour.propTypes = {
    //data: PropTypes.array
    data: PropTypes.shape({
        name: PropTypes.string
    })
}

export default TabFour;
