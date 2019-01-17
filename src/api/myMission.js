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

export function getBasicdata(data){
  return request({
    url: 'ledao/strs/manager/task/gt/basicdata',
    method: 'post',
    data
  })  
}

export function getLoanData(data){
  return request({
    url: '/ledao/strs/manager/task/gt/loandata',
    method: 'post',
    data
  })  
}

export function getCreditData(data){
  return request({
    url: '/ledao/strs/manager/task/gt/creditdata',
    method: 'post',
    data
  })    
}

export function getProcessData(data) {
  return request({
    url: '/ledao/strs/manager/task/gt/processdata',
    method: 'post',
    data
  })      
}

export function getAuditprocess(data) {
  return request({
    url: '/ledao/strs/manager/task/in/auditprocess',
    method: 'post',
    data
  })     
}

export function getcmodify(data) {
  return request({
    url: '/ledao/strs/manager/task/in/cmodify',
    method: 'post',
    data
  })     
}

export function getImageData(data) {
  return request({
    url: '/ledao/strs/manager/task/gt/imagedata',
    method: 'post',
    data
  })     
}

export function getAuditResult(data) {
  return request({
    url: '/ledao/strs/manager/task/in/auditresult',
    method: 'post',
    data
  })     
}

export function getFrauDassessMentData(data) {
  return request({
    url: '/ledao/strs/manager/task/gt/fraudassessmentdata',
    method: 'post',
    data
  })  
}