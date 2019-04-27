import axios from 'axios'

export default axios.create({
  baseURL: 'http://35.240.210.212',
  timeout: 10000,
  withCredentials: false,
})