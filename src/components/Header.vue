<template>
  <div class="header">
    <div class="left">
      <i v-if="hasBack" class="el-icon-back" @click="back"></i>
      <span style="font-size: 20px">{{ name }}</span>
    </div>
    <div class="right">
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ (userInfo && userInfo.nickName) || '' }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>账号：{{ (userInfo && userInfo.email) || 'fqniu' }}</p>
          <p>昵称：{{ (userInfo && userInfo.name) || '牛奶' }}</p>
          <el-tag  effect="dark" class="logout" @click="logout">
            退出
          </el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { localRemove, pathMap, localGet } from '@/utils'
// import { userInfo } from '@/api/goodlist'
import { userInfo } from '@/api/user'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const state = reactive({
      name: 'dashboard',
      userInfo: null,
      hasBack: false
    })
    onMounted(() => {
      const pathname = window.location.hash.split('/')[1] || ''
      if (!localGet('token')) {
        router.push({ path : '/login'})
        return 
      }
      if (!['login'].includes(pathname)) {
        getUserInfo()
      }
    })
    const getUserInfo = async () => {
      try {
        let res = await userInfo()
        console.log(res);
        if(res.code == 200){
          state.userInfo = res
        } else {
          ElMessage.error('接口报错，请稍后重试')
        }
      } catch (error) {
        console.log(error);
      }
    }
    const logout = () => {
      console.log('退出成功');
      localRemove('token')
      router.push({ path : '/login'})
    }
    const back = () => {
      router.back()
    }
    router.afterEach(to => {
      // console.log('to', to)
      const { id } = to.query
      state.name = pathMap[to.name]
      if (id && to.name == 'add') {
        state.name = '编辑商品'
      }
      state.hasBack = ['level2', 'level3', 'order_detail'].includes(to.name)
    })
    return {
      ...toRefs(state),
      logout,
      back
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.el-icon-back {
  border: 1px solid #e9e9e9;
  padding: 4px;
  border-radius: 50px;
  margin-right: 10px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>

<style>
/* .popper-user-box {
  width: 100px !important;
  height: 100px !important;
  background: #ccc;
  background-size: cover !important;
  border-radius: 0 !important;
  font-size: 14px;
  color: #000;
} */
.popper-user-box .nickname {
  position: relative;
  color: #000;
  background: #ccc;
  padding: 10px;
}
.popper-user-box .nickname .logout {
  /* position: absolute;
  right: 0;
  top: 0; */
  cursor: pointer;
}
</style>