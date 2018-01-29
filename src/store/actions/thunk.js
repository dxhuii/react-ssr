import { getHomeInfo } from './home';
import { getAnime } from './anime';

export const homeThunk = store => store.dispatch(getHomeInfo())
export const animeThumk = store => store.dispatch(getAnime())

