import { GET_ANMIE } from '../constants';

export const animeInfo = (state = [], action) => {
  switch(action.type){
    case GET_ANMIE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}