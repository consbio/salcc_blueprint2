import React from 'react';
import BarChart from './BarChart';
import './App.css';
import {AreaChart} from 'react-easy-chart';

function TabThree() {
    return (
      <div id = "Content">
              <h2>Watershed name</h2>
              <h4>Urbanization</h4>
          <svg width="100" height="250">
                <rect x="0" y="50" width="100%" height="50" fill = "#AC69B3"/>
                <rect x="0" y="100" width="100%" height="60" fill = "#AE76DE"/>
                <rect x="0" y="160" width="100%" height="40" fill = "#79529B"/>
                <rect x="0" y="200" width="100%" height="20" fill = "purple"/>
                <rect x="0" y="220" width="100%" height="50" fill = "#4D2B58"/>
            <BarChart data={[1,3,5,5.5,6]} size={[500,250]} />
          </svg>
            <h4>Sea Level Rise</h4>
          <svg width="320" height="220">
                <rect x="0" y="0" width="100%" height="60" fill = "#C7E1F5"/>
                <rect x="0" y="60" width="100%" height="50" fill = "#76BEF8"/>
                <rect x="0" y="110" width="100%" height="40" fill = "#4A90E2"/>
                <rect x="0" y="150" width="100%" height="15" fill = "#1C4F78"/>
              <rect x="0" y="10" width="100%" height="220" fill="url(#landprofile)"></rect>
            </svg>
                      <AreaChart
              margin={{top: 30, right: 0, bottom: 30, left: 0}}
              width={550}
              height={300}
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
        </div>
    );
}

export default TabThree;
