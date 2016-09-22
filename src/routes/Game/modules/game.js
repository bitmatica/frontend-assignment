// ------------------------------------
// Constants
// ------------------------------------
// TODO: Add game constants.

// ------------------------------------
// Actions
// ------------------------------------
// TODO: Add game actions.

export const actions = {
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// TODO: Add game action handlers.
const ACTION_HANDLERS = {
}

// ------------------------------------
// Reducer
// ------------------------------------
// TODO: Initialize markers here?
const initialState = {}
export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
