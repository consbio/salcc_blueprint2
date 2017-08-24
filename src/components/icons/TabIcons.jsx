import React from 'react';
import PropTypes from 'prop-types';


const ICONS = {
    Priorities: "M256.5 263.5c-1.8 5.6 1.4 11.6 7 13.4 1 .2 2 .3 3.2.3 4.5 0 8.7-3 10.2-7.5 3.5-11.8 7.6-22.6 12-33 15.2 12.5 32 19.2 50.6 19.2 83.7 0 151-113.3 151-207.2 0-15-12.3-27.5-27.4-27.5-94 0-207.2 67.4-207.2 151 0 17.6 6 33.7 17 48.2-6 13.4-11.7 27.5-16.5 43zM463.2 42.7c3.4 0 6 2.7 6 6 0 83.8-59.7 186-129.6 186-15 0-29-6.2-41.3-18 25.4-48.5 63-81.8 122.4-111 5.3-2.7 7.5-9 5-14.4-2.7-5.3-9-7.4-14.4-5-59.8 29.6-99.5 64.4-127 112.4-4.4-8.3-7-17-7-26.3 0-70 102.2-129.7 186-129.7zM448 352c-20.8 0-64 11.6-86 18-2.8-30.7-42-41.6-82.6-49.8-18.4-3.7-32.2-10.4-45.5-16.8-16.5-8-32-15.4-52.7-15.4-23.6 0-45 4.8-57.3 8.2-3.2-11.2-12.3-20.2-24.4-22.6l-86.8-17.4c-3.2-.6-6.4.2-9 2.2-2.4 2-3.8 5-3.8 8.3v170.6c0 6 4.8 10.7 10.7 10.7h66.8c13.2 0 24.4-8.4 29.2-20 24 11.2 134.4 62.7 181.3 62.7 41.4 0 126.5-42 183-69.6 14.6-7 26.7-13 34.6-16.6 4-1.7 6.4-5.5 6.4-9.7 0-25.2-26.3-42.7-64-42.7zm-344-45.5l-16 111c-.7 5.2-5.2 9.2-10.5 9.2H21.3v-147l74 14.8c5.7 1 9.4 6.4 8.6 12zM461.4 402c-51.3 25.2-137 67.3-173.5 67.3-38.8 0-140.7-45.4-176.7-63l12.5-87.8c7.7-2.5 31.5-9.2 57.5-9.2 15.8 0 28 6 43.3 13.3 13.8 6.7 29.5 14.2 50.6 18.5 46.4 9.5 66 19.2 66 32.3 0 2.6-.7 4.2-2.7 5.8-6.7 5-33.2 13.6-132.8-16-5.6-1.6-11.6 1.7-13.3 7.3-1.6 5.6 1.6 11.6 7.2 13.3 49.2 14.5 86.7 21.8 113.4 21.8 17.3 0 30-3 38.3-9.3.7-.4 1.2-1 1.8-1.6.8 0 1.5 0 2-.2 19-5.8 72.4-21 93-21 17.4 0 35.7 5.4 41 15.3-7.4 3.5-16.8 8.2-27.5 13.5z",
    Indicators: "M298.7 246.5V64c0-23.5-19.2-42.7-42.7-42.7S213.3 40.5 213.3 64v182.5c-25.3 14.8-42.6 42-42.6 73.5s17.3 58.7 42.6 73.5V448c0 23.5 19.2 42.7 42.7 42.7s42.7-19.2 42.7-42.7v-54.5c25.3-14.8 42.6-42 42.6-73.5s-17.3-58.7-42.6-73.5zM234.7 64c0-11.8 9.5-21.3 21.3-21.3s21.3 9.5 21.3 21.3v173.7c-6.8-1.8-14-3-21.3-3s-14.5 1.2-21.3 3V64zm42.6 384c0 11.8-9.5 21.3-21.3 21.3s-21.3-9.5-21.3-21.3v-45.7c6.8 1.8 14 3 21.3 3s14.5-1.2 21.3-3V448zM256 384c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zM128 76V64c0-23.5-19-42.7-42.7-42.7S42.7 40.5 42.7 64v12C17.3 90.6 0 118 0 149.2s17.3 58.7 42.7 73.5V448c0 23.5 19 42.7 42.6 42.7S128 471.5 128 448V222.8c25.4-14.8 42.7-42 42.7-73.5S153.4 90.7 128 76zM64 64c0-11.8 9.6-21.3 21.3-21.3 11.8 0 21.4 9.5 21.4 21.3v3c-7-1.8-14-3-21.4-3C78 64 71 65.2 64 67v-3zm42.7 384c0 11.8-9.6 21.3-21.4 21.3-11.7 0-21.3-9.5-21.3-21.3V231.6c7 1.8 14 3 21.3 3 7.4 0 14.5-1.2 21.4-3V448zM85.3 213.3c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zM469.3 118.5V64c0-23.5-19-42.7-42.6-42.7S384 40.5 384 64v54.5c-25.4 14.8-42.7 42-42.7 73.5s17.3 58.7 42.7 73.5V448c0 23.5 19 42.7 42.7 42.7s42.6-19.2 42.6-42.7V265.5c25.4-14.8 42.7-42 42.7-73.5s-17.3-58.7-42.7-73.5zm-64-54.5c0-11.8 9.6-21.3 21.4-21.3S448 52.2 448 64v45.7c-7-1.8-14-3-21.3-3s-14.5 1.2-21.4 3V64zM448 448c0 11.8-9.6 21.3-21.3 21.3s-21.4-9.5-21.4-21.3V274.3c7 1.8 14 3 21.4 3s14.4-1.2 21.3-3V448zm-21.3-192c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z",
    Partners: "M507.4 108.6c-2.8-2-6.4-2.5-9.7-1.3l-87 31.6c-10.8 4-19.3 11.8-24 22.2-1 2-1.6 4-2.2 6-15-4.3-42.7-13-70.3-27.3-41.7-21.6-73.5-11-100.8 9.8-13.8.3-33 2-51.6 3.6-12 1-23.3 2-32.5 2.6-.2-5.5-1.5-11-4-16.2-4.7-10.4-13.2-18.3-24-22.2L14.3 86c-3.2-1.2-7-.7-9.7 1.3-3 2-4.6 5.2-4.6 8.7v213.3c0 6 4.8 10.7 10.7 10.7h31c13.4 0 25.7-6.3 33.7-16.3l14.5 11c12.4 9.3 26 19.5 32 24.5 39.7 33.3 87.4 69.2 97 75.4 8.8 6 24.8 12 37 12 4.8 0 16.7 0 25.2-7 8.6 3.4 18 3.2 26.7-.6 8.6-4 15.6-11 19.7-19.8 8.3 1.7 18 .4 26.6-4 8-4 14-10.2 17.3-17.4 7.7.7 16-1.8 23.3-7.4 10.4-8 15.2-20 14-31.7l27-15c8 10.8 20.4 17.6 34.2 17.6h31c6 0 10.8-4.7 10.8-10.6V117.3c0-3.4-1.7-6.7-4.6-8.7zM61.8 284.8c-3 8.3-11 14-20 14H21.3V111L94 137.6c5.4 2 9.7 6 12 11.2 2.5 5.2 2.7 11 .7 16.4l-45 119.6zm320 68.6c-3.5 2.8-8.5 4.4-10.8 2h-.4c-.2-.3-.3-.6-.5-.7-7.5-6-41.7-41-62.8-63-4-4.3-11-4.5-15-.4-4.4 4-4.5 11-.4 15 5 5.3 44.7 46.7 60.6 61.2-1 4.7-5.5 7.6-7.7 8.7-6.8 3.4-14 3-16.6.4l-.2-.2-.3-.4c-12.8-10.2-45-44.3-52.2-52.2-4-4.3-10.7-4.6-15-.6-4.4 4-4.7 10.7-.7 15 .4.4 31.8 34.4 49.5 50-1.6 5-5.2 9.2-9.7 11.2-3.4 1.5-8.6 2.3-14.6-2-15.3-13-46-45.8-52-52.3-4-4.2-11-4.4-15.2-.4-4.3 4-4.5 10.8-.5 15 7.2 7.7 28.4 30.2 44.5 45.4-1.8.2-3.7.3-5.5.3-7 0-19.2-4.5-25.3-8.5-7.5-5-54.5-40-95-74-6.2-5-20.2-15.6-33-25.2L85 284l39.8-106.4c10.4-.5 24.2-1.7 38.8-3l24.5-2c-12 12.5-30.2 34.8-27.8 55.8 1 9.5 6.3 17.5 15 23 17.6 11 49.8 1.7 65.4-17.4 10-1.4 16.8-4 24.2-7.7 12.5 11.8 29.2 25.6 46.8 40 30.7 25.4 65.4 54 74.6 70 5 9-2 15.4-4.3 17zm18.4-34.3c-14.2-19-45-44.3-75-69-20-16.5-39-32-51-44.2-3.3-3.3-8.4-4-12.6-2-10.8 6-15.7 8.4-28 9.6-3.3.3-6.2 2-8 5-8.3 13.2-31.6 19.5-39 15-4-2.7-5-5.4-5.2-7.4-1-9 8.2-24.8 23.4-40 37.8-37.8 64.7-45.2 99.6-27.2 33.2 17 66 26.8 79.7 30.4.5 1.6.8 3.2 1.4 4.8l41.4 110.5-26.6 14.6zm90.5 1h-20.5c-9 0-17-5.6-20-13.8l-45-119.7c-2-5.4-1.7-11.2.7-16.4 2.3-5 6.6-9 12-11l72.7-26.4V320z"
}




function TabIcons(props) {
    const {icon} = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512"
            {...props} >
            <path d={ICONS[icon]}/>
        </svg>
    );
}

TabIcons.propTypes = {
    icon: PropTypes.string
}

export default TabIcons;
