import React from 'react';
import {AreaChart} from 'react-easy-chart';
import Whisker from './WhiskerPlot.js';

function TabTwo() {
    return (
        <div>
          <div id = "Content">
            <h2>Watershed name</h2>
            <div className="flex-container2">
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
              <div className="flex-item"> <h4>Ecosystem</h4></div>
            </div>
            <svg width="270" height="100">
              <text x="28" y="80" textAnchor="end" fill='#a4aab3' fontSize={12}>L</text>
              <text x="258" y="80" textAnchor="begin" fill='#a4aab3' fontSize={12}>H</text>
              <text x="10.8" y="20" textAnchor="begin" fill='#a4aab3' fontSize={14}>Amphibians</text>
              <line x1="126.8" x2="126.8" y1="18" y2="70" fill='#a4aab3'></line>
              <g transform="translate(0, 50)" >
                <path d="M50,6V0H370V6" fill='#a4aab3'></path>
                <line x1="50" x2="250" y1="0" y2="0" fill='#a4aab3'></line>
                <line x1="50" x2="50" y1="-22" y2="22" fill='#a4aab3'></line>
                <line x1="250" x2="250" y1="-22" y2="22"></line>
                <line x1="50" x2="50" y1="-22" y2="22"></line>
                <line x1="250" x2="250" y1="-22" y2="22" ></line>
                <rect x="121"  width="40" height="40" fill="url(#frogicon)"></rect>
              </g>
            </svg>
            <svg width="270" height="100">
              <text x="28" y="80" textAnchor="end" fill='#a4aab3' fontSize={12}>L</text>
              <text x="258" y="80" textAnchor="begin" fill='#a4aab3' fontSize={12}>H</text>
              <text x="10.8" y="20" textAnchor="begin" fill='#a4aab3' fontSize={14}>Amphibians</text>
              <line x1="126.8" x2="126.8" y1="18" y2="70" fill='#a4aab3'></line>
              <g transform="translate(0, 50)" >
                <path d="M50,6V0H370V6" fill='#a4aab3'></path>
                <line x1="50" x2="250" y1="0" y2="0" fill='#a4aab3'></line>
                <line x1="50" x2="50" y1="-22" y2="22" fill='#a4aab3'></line>
                <line x1="250" x2="250" y1="-22" y2="22"></line>
                <line x1="50" x2="50" y1="-22" y2="22"></line>
                <line x1="250" x2="250" y1="-22" y2="22" ></line>
                <rect x="60"  width="40" height="40" fill="url(#frogicon)"></rect>
              </g>
            </svg>
            <Whisker/>

          </div>
          <div id ="Footer">
            <div className="flex-container">
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
              <div className="flex-item"> <img src={'/images/basemap.png'} height={30}/></div>
            </div>
          </div>
        </div>

    );
}

export default TabTwo;
