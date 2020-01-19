import request from 'axios'
import { WEB_KEY } from '../config/index'
const WEATHER_BASE_URL = 'https://free-api.heweather.net/s6/weather'
const CITY_BASE_URL = 'https://search.heweather.net'
export const getNowWeather = (params: any = {}) => {
  params = { ...params, ...{ key: WEB_KEY } }
  return request({
    url: `${WEATHER_BASE_URL}/now`,
    method: 'GET',
    params
  })
}

// 通过关键字查询城市（支持模糊查询）
export const getCityByKeyWord = (params: any = {}) => {
  params = { ...params, ...{ key: WEB_KEY, group: 'cn' } }
  return request({
    url: `${CITY_BASE_URL}/find`,
    method: 'GET',
    params
  })
}

// 热门推荐城市
export const getHotCities = (params: any = {}) => {
  params = { ...params, ...{ key: WEB_KEY } }
  return request({
    url: `${CITY_BASE_URL}/top`,
    method: 'GET',
    params
  })
}
