const BASE_URL = '/api/user/'
import axios from 'axios';

export const userService = {
    query,
    getById,
    getEmptyCredentials
}

function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function getById(userId) {
    return axios.post(BASE_URL+userId)
        .then(res =>res.data )
}



function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}