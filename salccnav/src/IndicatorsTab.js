import React from 'react';
import {AreaChart} from 'react-easy-chart';

function TabTwo() {
    return (
      <div id = "Content">
              <h2>Watershed name</h2>
  <svg width="270" height="100">
    <text x="28" y="80" textAnchor="end">L</text>
    <text x="258" y="80" textAnchor="begin">H</text>
    <text x="126.8" y="14" textAnchor="middle">Amphibians</text>
    <line x1="126.8" x2="126.8" y1="18" y2="70" ></line>
    <g transform="translate(0, 50)" >
      <path d="M50,6V0H370V6"></path>
      <line x1="50" x2="250" y1="0" y2="0"></line>
      <line x1="50" x2="50" y1="-22" y2="22"></line>
      <line x1="250" x2="250" y1="-22" y2="22"></line>
      <line x1="50" x2="50" y1="-22" y2="22"></line>
      <line x1="250" x2="250" y1="-22" y2="22" ></line>
      <circle cx="200" r="18"></circle>
      <text x="200" y="5" textAnchor="middle" fill= "white" font-weight="bold">0.68</text>
    </g>
  </svg>
  </div>

    );
}

export default TabTwo;
