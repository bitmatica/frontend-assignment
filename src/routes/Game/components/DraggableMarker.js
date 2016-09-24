import React from 'react'

import {CELL_SIZE} from '../modules/game'

import Marker from './Marker'

class DraggableMarker extends React.Component {
  static propTypes = {
    marker: React.PropTypes.object.isRequired,
  }
  
  constructor () {
    super()
    this.onDragStart = this.onDragStart.bind(this)
  }
  
  onDragStart (ev) {
    ev.dataTransfer.setData("text/plain", this.props.marker.id);
  }
  
  render () {
    return (
      <div draggable="true" onDragStart={this.onDragStart}>
        <svg width={CELL_SIZE * 2} height={CELL_SIZE * 2}>
          <Marker marker={this.props.marker} />
        </svg>
      </div>
    )
  }
}

export default DraggableMarker
