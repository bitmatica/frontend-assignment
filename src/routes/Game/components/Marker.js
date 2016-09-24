import React from 'react'

class Marker extends React.Component {
  static propTypes = {
    marker: React.PropTypes.object.isRequired,
    offset: React.PropTypes.object
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

    return (
      <g transform={`translate(${offsetX},${offsetY})`}>
        <circle fill="white" stroke="black" r={r}></circle>
        <text alignmentBaseline="middle" textAnchor="middle">{x}, {y}</text>
      </g>
    )
  }
}

export default Marker
