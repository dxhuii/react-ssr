import { GET_ANMIE } from '../constants'

export const getAnime = () => async(dispatch, getState) => {
	const info = getState().animeInfo
	if( info.length === undefined ) return
  const res = await fetch('https://www.ikanfan.cn/tool/week.php')
	const json = await res.json()
	
	dispatch({ type:GET_ANMIE, data: json.ResponseData })
}
