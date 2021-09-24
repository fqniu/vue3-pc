<template>
  <div class="account">
    <el-card class="account-container">
      <div>子组件count: {{count}}</div>
      <el-button type="primary" @click="add">加1</el-button>
      <el-button type="primary" @click="subtract">减1</el-button>
      <div>子组件subcount: {{subcount}}</div>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'ChildrenCom',
  props:{
    count:{

    }
  },
  setup(props, context) {
    console.log(props, context);
    const state = reactive({
      subcount: 0
    })
    const add = () => {
      console.log('子组件触发add');
      state.subcount++
      context.emit('add', 1)
    }
    const subtract = () => {
      console.log('子组件触发subtract');
      state.subcount--
      context.emit('subtract', 2)
    }
    return {
      ...toRefs(state),
      add,
      subtract
    }
  }
}
</script>

<style scoped>

</style>