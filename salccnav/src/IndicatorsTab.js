import React from 'react';
import {AreaChart} from 'react-easy-chart';

function TabTwo() {
    return (

  <AreaChart
    margin={{top: 30, right: 0, bottom: 30, left: 0}}
    width={550}
    height={250}
    areaColors={['black','black','1C4F78','#33A4ff','#76BEF8','#C7E1F5']}
    data={[
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 }
      ],
      [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 }
      ],
      [
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 }
      ], [
        { x: 1, y: 6 },
        { x: 2, y: 6 },
        { x: 3, y: 6 }
      ], [
        { x: 1, y: 10 },
        { x: 2, y: 10 },
        { x: 3, y: 10 }
      ], [
        { x: 1, y: 12 },
        { x: 2, y: 12 },
        { x: 3, y: 12 }
      ]
    ]}

  />

    );
}

export default TabTwo;
