import loadData from '@/utils/loadData'

export function type() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      reducerName: 'type',
      actionType: 'GET_TYPE',
      api: 'GetType'
    })
  }
}
