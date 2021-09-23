<template>
  <div class="introduce">
    <el-card class="introduce-container">
      <h1>系统简介</h1>
      <div style="line-height: 30px">
        vue3 - pc 是一套企业级后台管理系统，基于 Vue 3.0 等相关技术栈开发。
      </div>
      <h1>技术选型</h1>
      <ul style="font-weight: bold">
        <li>Vue 3.x</li>
        <li>Vite 2.x</li>
        <li>Vue-Router 4.x</li>
        <li>Element-Plus（适配全新 Vue 3.x 的 PC 端组件库）</li>
        <li>Echarts 5.0</li>
        <li>axios</li>
        <li>wangEditor</li>
      </ul>
      <h1>联系作者</h1>
      <ul>
        <li>我的邮箱： {{ data.email }}</li>
        <li>我的微信：{{ data.wechat }}</li>
        <li>我的QQ：{{ data.qq }}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Introduce',
  setup() {
    const route = useRoute()
    const { id } = route.query
    const state = reactive({
      data: {}
      // tableData: []
    })
    onMounted(() => {
      // axios.get(`/orders/${id}`).then(res => {
      //   console.log(res)
      //   state.data = res.item
      //   state.tableData = res.item
      // })
      state.data = {
        name: 'fqniu',
        email: 'fqniu17@163.com',
        phone: '156****6052',
        wechat: 'nfq0123456789',
        qq: '1966798438@qq.com'
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>
<style scoped>
.introduce {
  height: 100%;
}
.introduce-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100% !important;
}
.course {
  font-weight: bold;
  display: inline-block;
}
.course li {
  line-height: 36px;
  color: #409eff;
  cursor: pointer;
}
</style>