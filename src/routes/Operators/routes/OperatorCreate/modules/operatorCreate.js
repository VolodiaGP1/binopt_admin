export const CREATE_BANNER = 'CREATE_BANNER'

// ------------------------------------
// Actions
// ------------------------------------

export function createBanner (bannerData) {
  return {
    type: CREATE_BANNER,
    payload: bannerData
  }
}

export const actions = {
  createBanner
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_BANNER]: (state, action) => { return action.payload }

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function bannerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
