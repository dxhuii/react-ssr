import { detail } from '@/store/actions/detail'

export default ({ store, match, user }) => {
  return new Promise(async resolve => {
    // 登录用户关闭服务端渲染
    if (user) {
      resolve()
      return
    }
    const { id } = match.params
    await detail({ id })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}