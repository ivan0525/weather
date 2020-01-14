import request from 'axios'
import { WEB_KEY } from '../config/index'
const BASE_URL = 'https://free-api.heweather.net/s6/weather'
export const getNowWeather = (params: any) => {
  params = { ...params, ...{ key: WEB_KEY } }
  return request({
    url: `${BASE_URL}/now`,
    method: 'GET',
    params
  })
}
