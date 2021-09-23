<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="../assets/logo.png" />
        <div class="name">
          <div class="title">管理系统</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="email">
          <el-input type="text" v-model.trim="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="getGoodlist">测试接口</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { localSet } from '@/utils'
import { goodList } from '@/api/goodlist'
import { userLogin } from '@/api/user'

export default {
  name: 'Login',
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        email: 'fqniu17@163.com',
        password: '123456'
      },
      checked: true,
      rules: {
        email: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })
    // const submitForm = async () => {
    //   loginForm.value.validate((valid) => {
    //     if (valid) {
    //       axios.post('/users/login', {
    //         email: state.ruleForm.email || '',
    //         // passwordMd5: md5(state.ruleForm.password)
    //         password: state.ruleForm.password
    //       }).then(res => {
    //         console.log(res)
    //         localSet('token', res.token)
    //         window.location.href = '/'
    //       }).catch((err) => {
		// 	      console.log(err)
    //         if(err.email){
    //           ElMessage.error(err.email)
    //         }else if(err.password){
    //           ElMessage.error(err.password)
    //         }
		//       });
    //     } else {
    //       // console.log('error submit!!')
    //       return ElMessage.error('请输入账号和密码')
    //     }
    //   })
    // }
    const submitForm = async () => {
      loginForm.value.validate(async (valid) => {
        if (valid) {
          try {
            let data = {
              email: state.ruleForm.email,
              password: state.ruleForm.password
            }
            let res = await userLogin(data)
            console.log(res);
            if(res.code == 200){
              localSet('token', res.token)
              window.location.href = '/'
            } else {
              ElMessage.error(res.email || res.password)
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          return ElMessage.error('请输入账号和密码')
        }
      })
    }
    const resetForm = () => {
      loginForm.value.resetFields();
    }
    const getGoodlist = async () => {
      let params = {
        page: 1,
        limit: 10
      }
      let res = await goodList(params)
      console.log(res);
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm,
      getGoodlist
    }
  }
}
</script>

<style scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
  }
  .login-container {
    width: 420px;
    min-height: 500px;
    padding-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
</style>
<style>
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form .el-form-item {
    margin-bottom: 12px;
  }
</style>