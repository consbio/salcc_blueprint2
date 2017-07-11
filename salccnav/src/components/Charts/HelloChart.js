import React from 'react';
const BarChart = require('react-chartjs').Bar;



class HelloChart extends React.Component {
    constructor() {
    super();

    const data = {
      labels: ["2010", "2020", "2030", "2040", "2050"],
      datasets: [{
        data: [40, 59, 65, 80, 81],
        label: "Priority",
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          //pattern.draw('square', '#ff6384'),
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,

      }]
    };
const options = {
      scales: {
        xAxes: [{
          stacked: false
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };
    this.state = {
      chartData: data,
      chartOptions: options,
    };
  }

  render() {
    const { chartData, chartOptions } = this.state;
    return (
      <div>
        <h2>Horizontal Bar Example</h2>
        <BarChart data={chartData} options={chartOptions} width="320" height="250"/>
      </div>
    );
  }
}
export default HelloChart;
