import { http } from "../utils/http";

// 用户登录
export function userLogin(data) {
  return http.request({
    method: "post",
    url: "/api/users/login",
    data: data
  });
}

// 用户信息
export function userInfo(params) {
  return http.request({
    method: "get",
    url: "/api/users/current",
    params
  });
}

// 商品列表
export function goodList(params) {
  return http.request({
    method: 'get',
    url: '/api/goodlist/info',
    params
  })
}