import cloneObj from '../clone'

export default function() {
  let initialState = {}
  return function detail(state = cloneObj(initialState), action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_DETAIL':
        if ((name, data)) state[name] = data
        break
      default:
        return state
    }
    return cloneObj(state)
  }
}

export const getDetail = (state, name) => {
  return state.detail[name] ? state.detail[name] : {}
}
