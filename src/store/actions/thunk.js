import { getHomeInfo } from './home';
import { getAnime, getAnimeDetail } from './anime';

console.info(this)

export const homeThunk = store => store.dispatch(getHomeInfo())
export const animeThumk = store => store.dispatch(getAnime())
export const detailThumk = (store, params) => store.dispatch(getAnimeDetail(params))

