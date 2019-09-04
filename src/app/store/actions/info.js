import loadData from '@/utils/loadData'

export function typeInfo({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'info',
      actionType: 'GET_TYPE_INFO',
      api: 'GetTypeInfo',
      params: {
        id
      }
    })
  }
}
