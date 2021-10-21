<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="../src/assets/logo.png" alt="logo" />
            <span>vue3 pc</span>
          </div>
        </div>
        <div class="line" />

        <el-menu
          :default-openeds="defaultOpen"
          background-color="#222832"
          text-color="#fff"
          :router="true"
          :default-active="currentPath"
          :unique-opened="true"
        >
          <el-submenu :index="idx" :key="item.id" v-for="(item, idx) in menu">
            <template #title>
              <span>{{ item.menuName }}</span>
            </template>
            <el-menu-item
              :index="child.path"
              v-for="child in item.children"
              :key="child.id"
            >
              <i :class="child.icon" />
              {{ child.menuName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { onUnmounted, reactive, toRefs } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import { pathMap, localGet } from '@/utils'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const noMenu = ['/login']
    const router = useRouter()
    const state = reactive({
      // defaultOpen: [0, 1, 2, 3],
      defaultOpen: [0],
      showMenu: true,
      currentPath: '/dashboard',
      count: {
        number: 1
      },
      menu: [
        {
          id: 1,
          path: '',
          menuName: '首页',
          icon: '',
          children: [
            {
              id: 11,
              path: '/introduce',
              menuName: '系统介绍',
              icon: 'el-icon-data-line',
              children: []
            },
            {
              id: 12,
              path: '/dashboard',
              menuName: '面板数据',
              icon: 'el-icon-odometer'
              // children:[
              //   {
              //     id: 121,
              //     path: '/swiper',
              //     menuName: '轮播图配置',
              //     icon: 'el-icon-picture',
              //     children: []
              //   },
              // ]
            }
          ]
        },
        {
          id: 2,
          path: '',
          menuName: '配置',
          icon: '',
          children: [
            {
              id: 21,
              path: '/swiper',
              menuName: '轮播图配置',
              icon: 'el-icon-picture'
            },
            {
              id: 22,
              path: '/hot',
              menuName: '热销商品配置',
              icon: 'el-icon-star-on'
            },
            {
              id: 23,
              path: '/new',
              menuName: '新品上线配置',
              icon: 'el-icon-sell'
            },
            {
              id: 24,
              path: '/recommend',
              menuName: '为你推荐配置',
              icon: 'el-icon-thumb'
            }
          ]
        },
        {
          id: 3,
          path: '',
          menuName: '管理',
          icon: '',
          children: [
            {
              id: 31,
              path: '/category',
              menuName: '分类管理',
              icon: 'el-icon-data-line'
            },
            {
              id: 32,
              path: '/good',
              menuName: '商品管理',
              icon: 'el-icon-odometer'
            },
            {
              id: 33,
              path: '/guest',
              menuName: '会员管理',
              icon: 'el-icon-plus'
            },
            {
              id: 34,
              path: '/order',
              menuName: '订单管理',
              icon: 'el-icon-plus'
            }
            // {
            //   id: 35,
            //   path: '/add',
            //   menuName: '添加管理',
            //   icon: 'el-icon-plus',
            // },
          ]
        },
        {
          id: 4,
          path: '',
          menuName: '系统',
          icon: '',
          children: [
            {
              id: 41,
              path: '/account',
              menuName: '修改密码',
              icon: 'el-icon-lock'
            }
          ]
        }
      ]
    })
    // 监听浏览器原生回退事件
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener(
        'popstate',
        () => {
          if (!localGet('token')) {
            state.showMenu = false
          }
        },
        false
      )
    }
    const unwatch = router.beforeEach((to, from, next) => {
      if (to.path == '/login') {
        // 如果路径是 /login 则正常执行
        next()
      } else {
        // 如果不是 /login，判断是否有 token
        if (!localGet('token')) {
          // 如果没有，则跳至登录页面
          next({ path: '/login' })
        } else {
          // 否则继续执行
          next()
        }
      }
      state.showMenu = !noMenu.includes(to.path)
      state.currentPath = to.path
      document.title = pathMap[to.name]
    })

    onUnmounted(() => {
      unwatch()
    })

    return {
      // state,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none !important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^='el-icon-'] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>
