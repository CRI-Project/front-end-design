import axios from "axios";

export const registerAPI = (data) => {

    return axios({
        method: 'post',
        url: 'http://8.141.56.170:8084/userinfo/register',
        data: data,
    })
}

export const loginAPI = (data) => {

    return axios({
        method: 'post',
        url: 'http://8.141.56.170:8084/userinfo/login',
        data: data,
    })
}