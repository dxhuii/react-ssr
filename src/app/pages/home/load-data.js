import { top250 } from '@/store/actions/list'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match, user }) => {
  return new Promise(async resolve => {
    // 登录用户关闭服务端渲染
    if (user) {
      resolve()
      return
    }

    const data = getCache('top250')
    if (data) {
      store.dispatch({ type: 'GET_TOP250', name: 'top250', data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await top250({ start: 0, count: 10 })(store.dispatch, store.getState)
    addCache('top250', res)
    resolve({ code: 200 })
  })
}
