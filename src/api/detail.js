import request from '@/utils/request'

// 查询车商详情
export function getDetail(id) {
  const data = {
    id
  }
  return request({
    url: '/ledao/strs/cardealer/query/detail',
    method: 'post',
    data
  })
}

// 查询金融产品列表
// export function financialPro(dealerId, currentPage, pageSize) {
//     const data = {
//         dealerId, currentPage, pageSize
//     }
//     return request({
//         url: '/ledao/strs/financial/product/query/list',
//         method: 'post',
//         data
//     })
// }

// 查询车型列表
export function getStyle(currentPage, pageSize) {
  const data = {
    currentPage, pageSize
  }
  return request({
    url: '/ledao/strs/car/style/list',
    method: 'post',
    data
  })
}

// 添加金融产品
export function addfinancial(dealerId, styleId, purpose, guidePrice, ticketPrice, purchasePrice, downPaymentRatio, downPayment, balancePayment, deposit, numberOfStages, monthlyPayment, totalPayment, totalLoan) {
  const data = {
    dealerId, styleId, purpose, guidePrice, ticketPrice, purchasePrice, downPaymentRatio, downPayment, balancePayment, deposit, numberOfStages, monthlyPayment, totalPayment, totalLoan
  }
  return request({
    url: '/ledao/strs/financial/product/add',
    method: 'post',
    data
  })
}

// 删除金融产品
export function delfinancial(id) {
  const data = {
    id
  }
  return request({
    url: '/ledao/strs/financial/product/delete',
    method: 'post',
    data
  })
}

// 编辑金融产品
export function editfinancial(id, dealerId, styleId, purpose, guidePrice, ticketPrice, purchasePrice, downPaymentRatio, downPayment, balancePayment, deposit, numberOfStages, monthlyPayment, totalPayment, totalLoan) {
  const data = {
    id, dealerId, styleId, purpose, guidePrice, ticketPrice, purchasePrice, downPaymentRatio, downPayment, balancePayment, deposit, numberOfStages, monthlyPayment, totalPayment, totalLoan
  }
  return request({
    url: '/ledao/strs/financial/product/edit',
    method: 'post',
    data
  })
}

// 查询一个车商下的车辆上牌机构列表
// export function license() {
//     const data = {

//     }
//     return request({
//         url: '/ledao/strs/license/org/query/list',
//         method: 'post',
//         data
//     })
// }
// 删除车商的一个上牌机构
export function licensedel(id) {
  const data = {
    id
  }
  return request({
    url: '/ledao/strs/cardealer/license/org/delete',
    method: 'post',
    data
  })
}

// 给车商添加上牌机构
export function addlicense(dealerId, licenseOrgId) {
  const data = {
    dealerId, licenseOrgId
  }
  return request({
    url: '/ledao/strs/cardealer/license/org/add',
    method: 'post',
    data
  })
}

// 查询车辆挂靠公司列表
export function orglicense(currentPage, pageSize) {
  const data = {
    currentPage, pageSize
  }
  return request({
    url: '/ledao/strs/license/org/query/list',
    method: 'post',
    data
  })
}
