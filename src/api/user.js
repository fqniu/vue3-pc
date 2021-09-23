import request from '@/utils/request';

// 用户登录
export function userLogin(data) {
  return request({
    method: "post",
    url: "/api/users/login",
    data: data
  });
}

export function userInfo(params) {
  return request({
    method: "get",
    url: "/api/users/current",
    params
  });
}
