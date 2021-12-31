/**
 * This is a javascript file of the APIs on login page use axios
 * @author Lihao Qiu
 */
import axios from "axios";

//The API of register
export const registerAPI = (data) => {

    return axios({
        method: 'post',
        url: 'http://8.141.56.170:8084/userinfo/register',
        data: data,
    })
}

//The API of login
export const loginAPI = (data) => {

    return axios({
        method: 'post',
        url: 'http://8.141.56.170:8084/userinfo/login',
        data: data,
    })
}