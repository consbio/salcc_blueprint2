import React, { Component } from 'react'
import './App.css'
import { max } from 'd3-array'
import { select } from 'd3-selection'
let s = require('d3-scale');
class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const yScale = s.scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', 'url(#dots-6)')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] -yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={250}>
      </svg>
   }
}
export default BarChart
