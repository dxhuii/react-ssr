import { type } from '@/store/actions/type'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match, user }) => {
  return new Promise(async resolve => {
    // 登录用户关闭服务端渲染
    if (user) {
      resolve()
      return
    }

    const data = getCache('GetType')
    if (data) {
      store.dispatch({ type: 'GET_TYPE', name: 'type', data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await type()(store.dispatch, store.getState)
    addCache('GetType', res)
    resolve({ code: 200 })
  })
}
