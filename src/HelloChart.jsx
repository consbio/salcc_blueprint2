import React from 'react';
const BarChart = require('react-chartjs').Bar;

class HelloChart extends React.Component {
  constructor() {
    super();
    const data = {
      labels: ["2010", "2020", "2030", "2040", "2050"],
      datasets: [{
        label: "Urbanization",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        data: [40, 59, 65, 80, 81],
      }]
    };
    const options = {
      scales: {
        xAxes: [{
          stacked: true
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
        <BarChart data={chartData} options={chartOptions} width="320" height="250" />
      </div>
    )
  }
}

export default HelloChart;
