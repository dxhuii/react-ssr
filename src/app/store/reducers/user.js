import cloneObj from '../clone'

export default function() {
  let initialState = {}
  return function user(state = cloneObj(initialState), action = {}) {
    switch (action.type) {
      case 'SAVE_USER_INFO':
        state = action.data
        break
      default:
        return state
    }
    return cloneObj(state)
  }
}

// 获取用户信息
export const getUserInfo = state => state.user || {}
