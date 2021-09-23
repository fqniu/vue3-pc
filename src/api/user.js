import request from '@/utils/request';

// 用户登录
export function userLogin(data) {
  return request({
    method: "post",
    url: "/api/users/login",
    data: data
  });
}

// 用户信息
export function userInfo(params) {
  return request({
    method: "get",
    url: "/api/users/current",
    params
  });
}

// 商品列表
export function goodList(params) {
  return request({
    method: 'get',
    url: '/api/goodlist/info',
    params
  })
}


