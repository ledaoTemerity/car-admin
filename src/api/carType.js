import request from '@/utils/request'

// 查询车型列表
export function carTypeList(currentPage, pageSize, brandName, seriesName) {
  const data = {
    currentPage, pageSize, brandName, seriesName
  }
  return request({
    url: 'ledao/strs/car/style/list',
    method: 'post',
    data
  })
}

// 查询品牌列表
export function getBrand(currentPage, pageSize) {
  const data = {
    currentPage, pageSize
  }
  return request({
    url: 'ledao/strs/car/brand/list',
    method: 'post',
    data
  })
}

// 查询车系列表
export function getSeries(currentPage, pageSize, brandId) {
  const data = {
    currentPage, pageSize, brandId
  }
  return request({
    url: 'ledao/strs/car/series/list',
    method: 'post',
    data
  })
}

// 添加车型
export function add(brandId, seriesId, style, brandName, seriesName, guidedPrice, yearModel) {
  const data = {
    brandId, seriesId, style, brandName, seriesName, guidedPrice, yearModel
  }
  return request({
    url: 'ledao/strs/car/style/add',
    method: 'post',
    data
  })
}

// 删除车型
export function del(id) {
  const data = {
    id
  }
  return request({
    url: 'ledao/strs/car/style/delete',
    method: 'post',
    data
  })
}

// 编辑车型
export function edit(id, brandId, seriesId, style, brandName, seriesName, guidedPrice, yearModel) {
  const data = {
    id, brandId, seriesId, style, brandName, seriesName, guidedPrice, yearModel
  }
  return request({
    url: 'ledao/strs/car/style/edit',
    method: 'post',
    data
  })
}
