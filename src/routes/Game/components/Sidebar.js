import React from 'react'

import DraggableMarker from './DraggableMarker'

import classes from './Sidebar.scss'

class Sidebar extends React.Component {
  static propTypes = {
    markers: React.PropTypes.array.isRequired,
  }

  render () {
    const markers = this.props.markers.map((m) => (<DraggableMarker key={m.id} marker={m} />))

    return (
      <div className={classes.sidebar}>
        {markers}
      </div>
    )
  }
}

export default Sidebar
