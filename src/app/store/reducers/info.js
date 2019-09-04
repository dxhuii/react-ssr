import cloneObj from '../clone'

let initialState = {}

export default (state = cloneObj(initialState), action = {}) => {
  const { data, name } = action
  switch (action.type) {
    case 'GET_TYPE_INFO':
      if ((name, data)) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getInfo = (state, name) => {
  return state.info[name] ? state.info[name] : {}
}
