import loadData from '@/utils/loadData'

export function detail({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'detail',
      actionType: 'GET_DETAIL',
      api: 'detail',
      params: {
        id
      }
    })
  }
}
