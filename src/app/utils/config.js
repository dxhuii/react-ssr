import { API } from 'Config'

export default {
  api: {
    top250: `${API}v2/movie/top250`,
    detail: `${API}v2/movie/subject/:id`
  }
}
