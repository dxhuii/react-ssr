import axios from 'axios'
import qs from 'qs'

const AJAX = ({ url = '', method = 'get', data = {}, headers = {} }) => {
  let option = { url, method, headers }
  // 处理URL里面带有冒号
  Object.keys(data).forEach(key => {
    if (option.url.indexOf(':' + key) > -1) {
      option.url = option.url.replace(':' + key, data[key])
      delete data[key]
    }
  })
  if (method === 'get') {
    data._t = new Date().getTime()
    option.params = data
  } else if (method === 'post') {
    option.data = qs.stringify(data)
  }

  return axios(option)
    .then(resp => {
      if (resp && resp.data) {
        let res = resp.data
        return [null, res]
      } else {
        return ['return none']
      }
    })
    .catch(function(error) {
      if (error && error.response && error.response.data) {
        return [error.response.data]
      } else {
        return ['return error']
      }
    })
}

export default AJAX
