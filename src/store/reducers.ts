import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

// 初始化state
const initialState = {
  myCityList: []
}

function getCityList(myCityList = initialState.myCityList, action: any) {
  switch (action.type) {
    case ActionTypes.GET_CITY_LIST:
      return action.myCityList
    default:
      return myCityList
  }
}

function setCityList(myCityList = initialState.myCityList, action: any) {
  switch (action.type) {
    case ActionTypes.SET_CITY_LIST:
      return action.myCityList
    default:
      return myCityList
  }
}

const reducer = combineReducers({
  getCityList,
  setCityList
})

export default reducer
