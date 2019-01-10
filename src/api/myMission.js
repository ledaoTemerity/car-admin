import request from '@/utils/request'

export function getMissionDBList(data) {
  return request({
    url: '/ledao/strs/manager/task/gt/tasklist',
    method: 'post',
    data
  })
}

export function getBusinessNodeCode() {
  const data = {
  }
  return request({
    url: '/ledao/strs/manager/task/gt/processlist',
    method: 'post',
    data
  })
}