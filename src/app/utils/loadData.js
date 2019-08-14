import config from '@/utils/config'
import Ajax from '@/common/ajax'

export default ({ dispatch, getState, reducerName, name, actionType, api, params, isPage = false, method = 'get', callback = () => {} }) => {
  return new Promise(async (resolve, reject) => {
    let state = getState(),
      list = state[reducerName][name] || {}
    if (list.loading) {
      resolve(['loading...'])
      return
    }

    // 已经加载所有，没有更多了
    if (Reflect.has(list, 'more') && list.more) {
      resolve([null, list])
      callback([null, list])
      return
    }

    if (!Reflect.has(list, 'data')) list.data = []

    // 添加页面page
    if (isPage) {
      if (!Reflect.has(list, 'page')) {
        list.page = 0
      } else {
        // 如果以及存在筛选条件，那么下次请求，进行翻页
        list.page += 12
      }
    }

    list.loading = true

    if (actionType) dispatch({ type: actionType, name, data: list })

    const url = config.api[api]

    let [err, data] = await Ajax({
      method,
      url,
      data: isPage ? Object.assign({}, params, { start: list.page }) : params
    })

    if (err) {
      list.loading = false
      resolve([null, list])
      callback([null, list])
      return
    }
    console.log(list.data, 'xxx')
    if (isPage && data.start > 0) {
      const cData = list.data.subjects.concat(data.subjects)
      list.data.subjects = cData
    } else {
      list.data = data
    }
    list.params = params
    list.loading = false

    if (isPage) list.more = data.total === data.start || data.total === 0

    if (actionType) dispatch({ type: actionType, name, data: list })

    resolve([null, list])
    callback([null, list])
  })
}
