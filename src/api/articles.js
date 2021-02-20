import request from '@/utils/request'

export function getList (parameter) {
  return request({
    url: '/getarticles',
    method: 'post',
    data: parameter
  })
}
