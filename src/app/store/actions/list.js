import loadData from '@/utils/loadData'

export function top250(start = 0, count = 12) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: 'top250',
      reducerName: 'list',
      actionType: 'GET_TOP250',
      api: 'top250',
      isPage: true,
      params: {
        start,
        count
      }
    })
  }
}
