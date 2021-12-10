import axios from "axios";

export const registerAPI = (data) => {
    console.log(data)

    return axios({
        method: 'post',
        url: 'http://8.141.56.170:8084/userinfo/register',
        header: {"Content-Type": "application/json"},
        data: data,
    })
}