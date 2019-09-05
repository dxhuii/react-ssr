import { type } from '@/store/actions/type'
import { typeInfo } from '@/store/actions/info'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match, user }) => {
  return new Promise(async resolve => {
    // 登录用户关闭服务端渲染
    if (user) {
      resolve()
      return
    }
    const { id = 1 } = match.params
    const data = getCache('home')
    if (data) {
      store.dispatch({ type: 'GET_TYPE', name: 'type', data: data[0][1] })
      store.dispatch({ type: 'GET_TYPE_INFO', name: id, data: data[1][1] })
      resolve({ code: 200 })
      return
    }

    Promise.all([type()(store.dispatch, store.getState), typeInfo({ id })(store.dispatch, store.getState)]).then(data => {
      addCache('home', data)
      resolve({ code: 200 })
    })
  })
}
