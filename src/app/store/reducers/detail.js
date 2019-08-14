import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function detail(state = initialState, action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_DETAIL':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getDetail = (state, name) => {
  return state.detail[name] ? state.detail[name] : {}
}