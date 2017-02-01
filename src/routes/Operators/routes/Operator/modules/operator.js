export const EDIT_OPERATOR = 'EDIT_OPERATOR'

// ------------------------------------
// Actions
// ------------------------------------

export function editOperator (operatorData) {
  return {
    type: EDIT_OPERATOR,
    payload: operatorData
  }
}

export const actions = {
  editOperator
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_OPERATOR]: (state, action) => { return action.payload }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function bannerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
