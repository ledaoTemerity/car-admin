import request from '@/utils/request'

export function loginByUsername(mobile, password) {
  const data = {
    mobile,
    password
  }
  return request({
    url: '/ledao/strs/operator/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

