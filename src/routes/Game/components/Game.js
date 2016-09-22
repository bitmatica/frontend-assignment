import React from 'react'
import classes from './Game.scss'

export const Game = (props) => (
  <div>
    <h3>Grid Game</h3>

    <p>Move the markers to the correct positions on the grid, then click the button to check your answer.</p>

    <div className={classes.gameContainer}>
      <div className={classes.sidebar}>
        Sidebar
      </div>
      <div className={classes.mainPane}>
        Main Pane
      </div>
    </div>
  </div>
)

// TODO: Add Game props and prop types.
Game.propTypes = {
}

export default Game
