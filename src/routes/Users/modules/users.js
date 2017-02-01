export const SET_USERS = 'SET_USERS'
export const CHANGE_SINGLE_USER = 'CHANGE_SINGLE_USER'

// ------------------------------------
// Actions
// ------------------------------------

export function setUsers (usersData) {
  return {
    type: SET_USERS,
    payload: usersData
  }
}

export function setChangedUser (userData) {
  return {
    type: CHANGE_SINGLE_USER,
    payload: userData
  }
}

export const actions = {
  setUsers,
  setChangedUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USERS]: (state, action) => action.payload,
  [CHANGE_SINGLE_USER]: (state, action) => {
    let changedUser = action.payload
    state.data[changedUser.id] = changedUser
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function usersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
