import Immutable from 'immutable'
import {times} from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const ROWS = 10
export const COLS = 10
export const MARKERS = 4
export const CELL_SIZE = 50

export const MARKER_CHANGE_POSITION = 'MARKER_CHANGE_POSITION'

// ------------------------------------
// Actions
// ------------------------------------
export function changePosition (id, position) {
  return {
    type: MARKER_CHANGE_POSITION,
    payload: {
      id,
      position
    }
  }
}
export const actions = {
  changePosition
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MARKER_CHANGE_POSITION]: (state, action) => {
    const {id, position} = action.payload
    console.log(state.toJS())
    return state.setIn(["markers", id, "position"], position)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
function makeMarker (i) {
  return {
    id: i,
    destination: {
      x: Math.floor(Math.random() * COLS) + 1,
      y: Math.floor(Math.random() * ROWS) + 1,
    },
    position: null,
  }
}

const initialState = Immutable.fromJS({markers: times(MARKERS, makeMarker)})

export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
