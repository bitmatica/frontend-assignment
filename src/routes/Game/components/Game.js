import React from 'react'
import * as d3 from 'd3'
import {times} from 'lodash'
import { DragSource } from 'react-dnd'
import {ROWS, COLS, MARKERS, CELL_SIZE} from '../modules/game'
import classes from './Game.scss'


const margin = {top: 20, right: 100, bottom: 30, left: 100};
const width = ROWS * CELL_SIZE;
const height = COLS * CELL_SIZE;

console.log({d3});

class Grid extends React.Component {
  static propTypes = {
  }

  constructor () {
    super()
    this.renderMarker = this.renderMarker.bind(this)
  }

  componentWillMount () {
    this.xScale = d3.scaleLinear()
      .domain([0, ROWS])
      .range([0, width]);

    this.yScale = d3.scaleLinear()
      .domain([0, ROWS])
      .range([height, 0]);

    this.xAxis = d3.axisBottom(this.xScale)
    this.yAxis = d3.axisLeft(this.yScale)
    
  }

  componentDidMount () {
    d3.select(this.refs.svg)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    const svg = d3.select(this.refs.container)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    console.log({svg})
    
      // Gridlines
      d3.select(this.refs.xAxis)
          .attr("class", "grid")
          .attr("transform", "translate(0," + height + ")")
          .call(this.xAxis
            .ticks(COLS)
            .tickSize(-height))

      d3.select(this.refs.yAxis)
          .attr("class", "grid")
          .call(this.yAxis
            .ticks(ROWS)
            .tickSize(-width))

      // Axes
      //svg.append("g")
          //.attr("transform", "translate(0," + height + ")")
          //.call(this.xAxis)

      //svg.append("g")
          //.attr("class", "grid")
          //.call(this.yAxis)
  }

  renderMarker (marker) {
    let pos = marker.position
    let x = this.yScale(marker.position.y)
    let y = this.xScale(marker.position.x)
    const offset = {x, y}

    return <Marker marker={marker} key={marker.id} offset={offset} />
  }

  render () {
    const {markers, changePosition} = this.props

    const markerElements = markers.map(this.renderMarker)

    const onDrop = (ev) => {
      ev.preventDefault();
      console.log('onDrop')

      let mPos = d3.mouse(this.refs.container, d3.event = ev)
      let mdx = this.xScale.invert(mPos[0])
      let mdy = this.yScale.invert(mPos[1])
      let md = {x: mdx, y: mdy}
      const position = {x: Math.round(mdx), y: Math.round(mdy)}

      changePosition(0, position)
    }

    function onDragOver(ev) {
      ev.preventDefault();
      console.log('onDragOver')
    }

    return (
      <div style={{position: "relative"}} onDrop={onDrop} onDragOver={onDragOver}>
        <svg ref="svg">
          <g ref="container">
            <g ref="xAxis" />
            <g ref="yAxis" />
            {markerElements}
          </g>
        </svg>
      </div>
    )
  }
}

class Marker extends React.Component {
  static propTypes = {
  }

  render () {
    const {marker, offset, connect} = this.props
    const {destination, position} = marker
    const {x, y} = destination
    const r = 30.5
    const d = r * 2
    const offsetX = offset ? offset.x : d
    const offsetY = offset ? offset.y : d

    return (
        <g draggable="true" transform={`translate(${offsetX},${offsetY})`}>
          <circle fill="white" stroke="black" r={r}></circle>
          <text alignmentBaseline="middle" textAnchor="middle">{x}, {y}</text>
        </g>
    )
  }
}


class Sidebar extends React.Component {
  static propTypes = {
    markers: React.PropTypes.array.isRequired,
  }

  renderMarker (marker) {
    return (
      <div draggable="true">
        <svg width={CELL_SIZE * 2} height={CELL_SIZE * 2}>
        <Marker marker={marker} key={marker.id} />
        </svg>
      </div>
    )
  }

  render () {
    const markers = this.props.markers.map(this.renderMarker)

    return (
      <div className={classes.sidebar}>
        {markers}
      </div>
    )
  }
}

class Game extends React.Component {
  render () {
    const {changePosition, game} = this.props
    const markers = game.get("markers").toJS()

    const sidebarMarkers = markers.filter(m => !m.position)
    const gridMarkers = markers.filter(m => m.position)

    return (
      <div>
        <h3>Grid Game</h3>

        <p>Move the markers to the correct positions on the grid, then click the button to check your answer.</p>

        <div className={classes.gameContainer}>
          <Sidebar markers={sidebarMarkers} />
          <div className={classes.mainPane}>
            <Grid markers={gridMarkers} changePosition={changePosition} />
          </div>
        </div>
      </div>
    )
  }
}

// TODO: Add Game props and prop types.
Game.propTypes = {
}

export default Game
