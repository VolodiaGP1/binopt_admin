// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER = 'LOGIN_USER'

// ------------------------------------
// Actions
// ------------------------------------
export function loginUser (value) {
  return {
    type: LOGIN_USER,
    payload: value
  }
}

export const actions = {
  loginUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_USER]: (state, action) => { return action.payload }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
