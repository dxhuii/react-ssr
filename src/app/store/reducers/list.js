import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function list(state = initialState, action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_TOP250':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getList = (state, name) => {
  return state.list[name] ? state.list[name] : {}
}
