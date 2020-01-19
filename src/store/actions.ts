import * as ActionTypes from './actionTypes'

export const getCityList = (myCityList: string[]) => {
  return { type: ActionTypes.GET_CITY_LIST, myCityList }
}

export const setCityList = (myCityList: string[]) => {
  return { type: ActionTypes.SET_CITY_LIST, myCityList }
}
