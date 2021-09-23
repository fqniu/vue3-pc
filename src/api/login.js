import { http } from "../utils/http";

export default {
  userLogin(data) {
    return http.request({
      method: "post",
      url: "/api/users/login",
      data: data
    });
  },
  
  // 商品列表
  goodList(params) {
    return http.request({
      method: 'get',
      url: '/api/goodlist/info',
      params
    })
  }
}