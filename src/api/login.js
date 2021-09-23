import { http } from "../utils/request";

export default {
  userLogin(data) {
    return http.request({
      method: "post",
      url: "/api/users/login",
      data: data
    });
  }
}