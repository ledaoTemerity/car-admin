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

// 新增节点模块
export function getProcessList(data) {
  return request({
    url: '/ledao/strs/process/getProcessList',
    method: 'post',
    data
  })   
}

export function addProcessNode(data) {
  return request({
    url: '/ledao/strs/process/addProcessNode',
    method: 'post',
    data
  })   
}

export function getCompanyList(data) {
  return request({
    url: '/ledao/strs/org/getCompanyList',
    method: 'post',
    data
  })    
}

export function getDeptList(data) {
  return request({
    url: '/ledao/strs/org/getDeptList',
    method: 'post',
    data
  })     
}

export function getOperatorList(data) {
  return request({
    url: '/ledao/strs/operator/getOperatorList',
    method: 'post',
    data
  })      
}

export function getqxMenuList(data) {
  return request({
    url: '/ledao/strs/operator/getOperatorList',
    method: 'post',
    data
  })      
}

export function getRoleList(data) {
  return request({
    url: '/ledao/strs/operator/role/getRoleList',
    method: 'post',
    data
  })  
}

export function deleteUser(data) {
  return request({
    url: '/ledao/strs/operator/delete',
    method: 'post',
    data
  })    
}

export function createUserData(data){
  return request({
    url: '/ledao/strs/operator/create',
    method: 'post',
    data
  })   
}


export function editUserData(data) {
  return request({
    url: '/ledao/strs/operator/edit',
    method: 'post',
    data
  })    
}

export function deleteRole(data) {
  return request({
    url: '/ledao/strs/operator/role/delete',
    method: 'post',
    data
  })   
}

export function editRole(data) {
  return request({
    url: '/ledao/strs/operator/role/edit',
    method: 'post',
    data
  })    
}

export function addRole(data) {
  return request({
    url: '/ledao/strs/operator/role/add',
    method: 'post',
    data
  })      
}

export function getAllMenu(data) {
  return request({
    url: '/ledao/strs/operator/menu/all',
    method: 'post',
    data
  })     
}

export function getOrgList(data) {
  return request({
    url: '/ledao/strs/org/getOrgList',
    method: 'post',
    data
  })  
}


export function addOrg(data) {
  return request({
    url: '/ledao/strs/org/addOrg',
    method: 'post',
    data
  })  
}

export function editQx(data) {
  return request({
    url: '/ledao/strs/operator/menu/edit',
    method: 'post',
    data
  })   
}

export function workstatus(data) {
  return request({
    url: '/ledao/strs/manager/task/gt/workstatus',
    method: 'post',
    data
  })     
}

export function oprWorkStatus(data){
  return request({
    url: '/ledao/strs/manager/task/up/workstatus',
    method: 'post',
    data
  })     
}

export function resetPassword(data) {
  return request({
    url: '/ledao/strs/operator/reset',
    method: 'post',
    data
  })   
}