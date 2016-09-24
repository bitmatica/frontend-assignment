import React from 'react'
import * as d3 from 'd3'

import {ROWS, COLS, CELL_SIZE} from '../modules/game'

import Marker from './Marker'

import classes from './Grid.scss'

const margin = {top: 20, right: 100, bottom: 30, left: 100}
const width = ROWS * CELL_SIZE
const height = COLS * CELL_SIZE

class Grid extends React.Component {
  static propTypes = {
    markers: React.PropTypes.array.isRequired,
    changePosition: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.renderMarker = this.renderMarker.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
  }

  componentWillMount () {
    this.xScale = d3.scaleLinear()
      .domain([0, ROWS])
      .range([0, width])

    this.yScale = d3.scaleLinear()
      .domain([0, ROWS])
      .range([height, 0])

    this.xAxis = d3.axisBottom(this.xScale)
    this.yAxis = d3.axisLeft(this.yScale)
  }

  componentDidMount () {
    d3.select(this.refs.svg)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    d3.select(this.refs.container)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Gridlines
    d3.select(this.refs.xAxis)
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(this.xAxis
        .ticks(COLS)
        .tickSize(-height))

    d3.select(this.refs.yAxis)
      .attr('class', 'grid')
      .call(this.yAxis
        .ticks(ROWS)
        .tickSize(-width))
  }

  onDrop (ev) {
    ev.preventDefault()
    const markerID = ev.dataTransfer.getData('text')

    const mPos = d3.mouse(this.refs.container, d3.event = ev)
    const mdx = this.xScale.invert(mPos[0])
    const mdy = this.yScale.invert(mPos[1])

    const position = {x: Math.round(mdx), y: Math.round(mdy)}

    this.props.changePosition(markerID, position)
  }

  onDragOver (ev) {
    ev.preventDefault()
  }

  renderMarker (marker) {
    const x = this.xScale(marker.position.x)
    const y = this.yScale(marker.position.y)
    const offset = {x, y}

    return <Marker marker={marker} key={marker.id} offset={offset} />
  }

  render () {
    const markers = this.props.markers.map(this.renderMarker)

    return (
      <div className={classes.grid} onDrop={this.onDrop} onDragOver={this.onDragOver}>
        <svg ref="svg">
          <g ref="container">
            <g ref="xAxis" />
            <g ref="yAxis" />
            {markers}
          </g>
        </svg>
      </div>
    )
  }
}

export default Grid
