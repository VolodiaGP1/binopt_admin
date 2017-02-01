export const SET_USER = 'SET_USER'

// ------------------------------------
// Actions
// ------------------------------------

export function setUser (userData) {
  return {
    type: SET_USER,
    payload: userData
  }
}

export const actions = {
  setUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USER]: (state, action) => { return action.payload }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
