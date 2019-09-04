import cloneObj from '../clone'

export default function() {
  let initialState = {}
  return function list(state = cloneObj(initialState), action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_TOP250':
        if ((name, data)) state[name] = data
        break
      default:
        return state
    }
    return cloneObj(state)
  }
}

export const getList = (state, name) => {
  return state.list[name] ? state.list[name] : {}
}
