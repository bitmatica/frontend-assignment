import React from 'react'

import classes from './Buttons.scss'

class Buttons extends React.Component {
  static propTypes = {
    markers: React.PropTypes.array.isRequired,
    changePosition: React.PropTypes.func.isRequired,
  }
  
  constructor () {
    super()
    this.checkSolution = this.checkSolution.bind(this)
    this.reset = this.reset.bind(this)
  }
  
  checkSolution () {
    let correct = (this.props.markers.length === 4) ? true : false
    
    this.props.markers.forEach((m) => {
      if (m.destination.x !== m.position.x || m.destination.y !== m.position.y) {
        correct = false;
      }
    });
    
    if (correct) {
      alert("Congratulations! You win.");
    } else {
      alert("Incorrect! Try again.");
    }
    
    this.reset();
  }
  
  reset () {
    this.props.markers.forEach((m) => {
      this.props.changePosition(m.id, null);
    });
  }
  
  render () {
    return (
      <div className={classes.buttonContainer}>
        <button className='btn btn-default' onClick={this.checkSolution}>Check Solution</button>
        <button className='btn btn-default' onClick={this.reset}>Try Again</button>
      </div>
    )
  }
}

export default Buttons
