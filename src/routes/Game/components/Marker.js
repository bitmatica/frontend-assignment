import React from 'react'

class Marker extends React.Component {
  static propTypes = {
    marker: React.PropTypes.object.isRequired,
    offset: React.PropTypes.object
  }

  constructor () {
    super()
    this.getColor = this.getColor.bind(this)
  }

  getColor () {
    const m = this.props.marker

    if (!m.position) {
      return '#FBD836'
    } else if (m.destination.x === m.position.x && m.destination.y === m.position.y) {
      return '#BCD86A'
    } else {
      return '#F35E68'
    }
  }

  render () {
    const {marker, offset} = this.props
    const {destination} = marker
    const {x, y} = destination

     // Ends up with an odd diameter so the marker is centered on a point
    const r = 30.5
    const d = r * 2
    const offsetX = offset ? offset.x : d
    const offsetY = offset ? offset.y : d

    const color = this.getColor()

    return (
      <g className="marker" transform={`translate(${offsetX},${offsetY})`}>
        <circle className="circle" fill={color} stroke="#444" r={r}></circle>
        <text className="coordinates" fill="#444" alignmentBaseline="middle" textAnchor="middle">{x}, {y}</text>
      </g>
    )
  }
}

export default Marker
