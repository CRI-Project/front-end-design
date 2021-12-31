/**
 * This is a javascript file of the APIs on home page use axios
 * @author Lihao Qiu, Jianwei Zhao
 */
import axios from "axios";

//The API of get the list of the data from sensor
export const getList = () => {
    return axios.get('localhost:3000/amqp')
}

//The API of change the state of switch on control page
export const changeState = () => {
    return axios.get('localhost:3000/switchC', {})
}

//The API of get the state of switch on control page
export const getState = () => {
    return axios.get('localhost:3000/switch', {});
}

//The API of get the weather information on home page
export const getWeather = () => {
    return axios.get('https://wthrcdn.etouch.cn/weather_mini?citykey=101230101')
}

//The API of get the air quality information on home page
export const getAirQuality = () => {
    return axios.get('https://api.waqi.info/feed/fuzhou/?token=aa50acc9ef4b0f0771dec39d2cd2007d2da88089')
}