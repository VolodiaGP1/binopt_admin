export const SET_OPERATORS_DATA = 'SET_OPERATORS_DATA'
export const SET_OPERATORS_META = 'SET_OPERATORS_META'
export const FILTER_OPERATORS = 'FILTER_OPERATORS'
export const FILTERED_OPERATORS = 'FILTERED_OPERATORS'
export const SET_OPERATORS = 'SET_OPERATORS'

// export const CHANGE_SINGLE_USER = 'CHANGE_SINGLE_USER'

// ------------------------------------
// Actions
// ------------------------------------

export function setOperatorsData (usersData) {
  return {
    type: SET_OPERATORS_DATA,
    payload: usersData
  }
}

export function setOperatorsMeta (usersData) {
  return {
    type: SET_OPERATORS_META,
    payload: usersData
  }
}

export function setOperators (operatorData) {
  return {
    type: SET_OPERATORS,
    payload: usersData
  }
}

export function filterOperators (operatorsData) {
  return {
    type: FILTER_OPERATORS,
    payload: operatorsData
  }
}

export function filteredOperators (operatorsData) {
  return {
    type: FILTERED_OPERATORS,
    payload: operatorsData
  }
}
// export function setChangedUser (userData) {
//   return {
//     type: CHANGE_SINGLE_USER,
//     payload: userData
//   }
// }

export const actions = {
  setOperatorsData,
  setOperatorsMeta,
  filterOperators,
  filteredOperators,
  setOperators

  // setChangedUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_OPERATORS_DATA]: (state, action) => {
    // console.log('set_operators-date', state, action)
    // if (Array.isArray(state)) {
    //   state = {}
    // }
    // debugger;
    // state.data = action.payload
    return action.payload
  },
  [SET_OPERATORS_META]: (state, action) => {
    state.meta = action.payload
    return state
  },
  [FILTER_OPERATORS]: (state, action) => {
    state.filter = action.payload
    return state
  },
  [FILTERED_OPERATORS]: (state, action) => {
    state.filtered_operators = action.payload
    return state
  },
  [SET_OPERATORS]: (state, action) => {
    state.data = action.payload
    return state
  }
  // [CHANGE_SINGLE_USER]: (state, action) => {
  //   let changedUser = action.payload
  //   state[changedUser.id] = changedUser
  //   return state
  // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function bannersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
