import request from '@/utils/request'

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

// 查询车辆挂靠公司列表
export function licenseList(currentPage, pageSize, company, provinceId, cityId) {
  const data = {
    currentPage, pageSize, company, provinceId, cityId
  }
  return request({
    url: '/ledao/strs/license/org/query/list',
    method: 'post',
    data
  })
}

// 启用/停用车辆挂靠单位
export function licensestate(id, state) {
  const data = {
    id, state
  }
  return request({
    url: '/ledao/strs/license/org/update/state',
    method: 'post',
    data
  })
}

// 新增
export function add(company, contacts, telephone, provinceId, cityId, districtId, provinceName, cityName, districtName, address, state) {
  const data = {
    company, contacts, telephone, provinceId, cityId, districtId, provinceName, cityName, districtName, address, state
  }
  return request({
    url: '/ledao/strs/license/org/add',
    method: 'post',
    data
  })
}

// 编辑
export function edit(id, company, contacts, telephone, provinceId, cityId, districtId, provinceName, cityName, districtName, address, state) {
  const data = {
    id, company, contacts, telephone, provinceId, cityId, districtId, provinceName, cityName, districtName, address, state
  }
  return request({
    url: '/ledao/strs/license/org/edit',
    method: 'post',
    data
  })
}

