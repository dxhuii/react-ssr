import { combineReducers } from 'redux'

import list from './list'
import scroll from './scroll'
import history from './history'
import user from './user'
import detail from './detail'

export default function() {
  const states = {
    list: list(),
    scroll: scroll(),
    history: history(),
    user: user(),
    detail: detail()
  }

  return combineReducers(states)
}
