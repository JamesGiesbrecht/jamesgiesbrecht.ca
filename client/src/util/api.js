import axios from 'axios'

const API = axios.create()

const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  API.defaults.headers.common.Authorization = `Bearer ${user.token}`
}

export default API
