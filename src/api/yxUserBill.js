import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/yxUserBill',
    method: 'post',
    data
  })
}

// export function del(ids) {
//   return request({
//     url: 'api/yxUserBill/',
//     method: 'delete',
//     data: ids
//   })
// }
export function del(id) {
  return request({
    url: 'api/yxUserBill/' + id,
    method: 'delete'
  })
}
export function edit(data) {
  return request({
    url: 'api/yxUserBill',
    method: 'put',
    data
  })
}

