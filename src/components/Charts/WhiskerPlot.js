import React from 'react';

function Whisker() {
    return (
      <div id = "Content">
      <svg width="270" height="100">
        <text x="10.8" y="20" textAnchor="begin" fill='#a4aab3' fontSize={14}>Amphibians</text>
        <line x1="126.8" x2="126.8" y1="18" y2="70" fill='#a4aab3'></line>
        <g transform="translate(0, 50)" >
          <path d="M15,6V0H370V6" fill='#a4aab3'></path>
          <line x1="50" x2="250" y1="0" y2="0" fill='#a4aab3'></line>
          <line x1="50" x2="50" y1="-22" y2="22" fill='#a4aab3'></line>
          <line x1="250" x2="250" y1="-22" y2="22"></line>
          <line x1="50" x2="50" y1="-22" y2="22"></line>
          <line x1="250" x2="250" y1="-22" y2="22" ></line>
          <rect x="200"  width="40" height="40" fill="url(#frogicon)"></rect>
        </g>
        <text x="28" y="80" textAnchor="end" fill='#a4aab3' fontSize={10}>Low</text>
        <text x="250" y="80" textAnchor="begin" fill='#a4aab3' fontSize={10}>High</text>
      </svg>


      </div>

    );
}

export default Whisker;
