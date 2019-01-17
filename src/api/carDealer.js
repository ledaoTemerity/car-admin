import request from '@/utils/request'

// 查询车商列表
export function carDealerList(currentPage, pageSize, dealerName, status, carDealerOrgId) {
  const data = {
    currentPage, pageSize, dealerName, status, carDealerOrgId
  }
  return request({
    url: 'ledao/strs/cardealer/query/list',
    method: 'post',
    data
  })
}

// 查询所属分公司列表
export function orglist() {
  const data = {

  }
  return request({
    url: '/ledao/strs/cardealer/org/list',
    method: 'post',
    data
  })
}

// 查询省份列表
export function province() {
  const data = {

  }
  return request({
    url: '/ledao/strs/area/province',
    method: 'post',
    data
  })
}

// 查询城市列表
export function city(areaId) {
  const data = {
    areaId
  }
  return request({
    url: '/ledao/strs/area/city',
    method: 'post',
    data
  })
}

// 查询区域列表
export function district(areaId) {
  const data = {
    areaId
  }
  return request({
    url: '/ledao/strs/area/district',
    method: 'post',
    data
  })
}

// 添加车商
export function add(dealerName, carDealerOrgId, status, provinceId, provinceName, cityId, cityName, districtId, districtName, address) {
  const data = {
    dealerName, carDealerOrgId, status, provinceId, provinceName, cityId, cityName, districtId, districtName, address
  }
  return request({
    url: '/ledao/strs/cardealer/add',
    method: 'post',
    data
  })
}

// 删除车商
export function del(id) {
  const data = {
    id
  }
  return request({
    url: '/ledao/strs/cardealer/delete',
    method: 'post',
    data
  })
}

// 编辑车商
export function edit(address, carDealerOrgId, cityId, cityName, dealerName, dealerNo, districtId, districtName, id, provinceId, provinceName, state, status) {
  const data = {
    address, carDealerOrgId, cityId, cityName, dealerName, dealerNo, districtId, districtName, id, provinceId, provinceName, state, status
  }
  return request({
    url: '/ledao/strs/cardealer/edit',
    method: 'post',
    data
  })
}

