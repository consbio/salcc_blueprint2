import React from 'react';
import './App.css';
import {AreaChart} from 'react-easy-chart';

function TabOne() {
    return (
        <div id = "Content">
        <h2>Watershed Name</h2>
        <AreaChart
          margin={{top: 30, right: 0, bottom: 30, left: 0}}
          width={550}
          height={450}
          areaColors={['black','black','purple','red','hotpink','pink']}
          data={[
            [
              { x: 1, y: 0 },
              { x: 2, y: 0 },
              { x: 3, y: 0 }
            ],
            [
              { x: 1, y: 1 },
              { x: 2, y: 1 },
              { x: 3, y: 1 }
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
        </div>
    );
}

export default TabOne;
