import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/897bb0b2416bd7d02450b8c2d531d06b/jdhome'
  // baseURL: 'http://localhost:3000/',
  // withCredentials: true, // 允许跨域传递cookie
  // timeout: 10000
})
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Coutent-Tyle': 'aoolication/json'
      }
    }).then((res) => { resolve(res) }, err => {
      reject(err)
    })
  })
}
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((res) => { resolve(res.data) }, err => {
      reject(err)
    })
  })
}
