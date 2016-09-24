import React from 'react'
import Immutable from 'immutable'

import Grid from './Grid'
import Sidebar from './Sidebar'
import Buttons from './Buttons'

import classes from './Game.scss'

class Game extends React.Component {
  static propTypes = {
    game: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    changePosition: React.PropTypes.func.isRequired
  }

  render () {
    const {game, changePosition} = this.props
    const markers = game.get('markers').toJS()

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

        <Buttons markers={gridMarkers} changePosition={changePosition} />

      </div>
    )
  }
}

export default Game
