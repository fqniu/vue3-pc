<template>
  <div class="introduce">
    <el-card class="introduce-container">
      <div class="order">
        <el-card class="order-item">
          <template #header>
            <div class="card-header">
              <span>今日订单数</span>
            </div>
          </template>
          <div class="item">1888</div>
        </el-card>
        <el-card class="order-item">
          <template #header>
            <div class="card-header">
              <span>今日时长</span>
            </div>
          </template>
          <div class="item">36271</div>
        </el-card>
        <el-card class="order-item">
          <template #header>
            <div class="card-header">
              <span>今日效率</span>
            </div>
          </template>
          <div class="item">60%</div>
        </el-card>
      </div>

      <div>父组件控制子组件加减1</div>
      <el-button type="primary" @click="add">加1</el-button>
      <el-button type="primary" @click="subtract">减1</el-button>
      <ChildrenCom :count="count" />
     

      <div>子组件控制父组件加减1</div>
      <div>父组件：{{count}}</div>
      <ChildrenCom :count="count" @add="add" @subtract="subtract" />

      <!-- <div id="zoom"></div> -->
    </el-card>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import ChildrenCom from '@/views/components/ChildrenCom.vue'

let myChart = null
export default {
  name: 'Index',
  components:{
    ChildrenCom
  },
  setup() {
    const state = reactive({
      count: 0
    })
    const add = () => {
      state.count++
    }
    const subtract = () => {
      state.count--
    }
    // onMounted(() => {
    //   if (window.echarts) {
    //     // 基于准备好的dom，初始化echarts实例
    //     myChart = window.echarts.init(document.getElementById('zoom'))
    //     // 指定图表的配置项和数据
    //     const option = {
    //       title: {
    //         text: '系统折线图'
    //       },
    //       tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //           type: 'cross',
    //           label: {
    //             backgroundColor: '#6a7985'
    //           }
    //         }
    //       },
    //       legend: {
    //         data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入']
    //       },
    //       toolbox: {
    //         feature: {
    //           saveAsImage: {}
    //         }
    //       },
    //       grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //       },
    //       xAxis: [
    //         {
    //           type: 'category',
    //           boundaryGap: false,
    //           data: ['2021-03-11', '2021-03-12', '2021-03-13', '2021-03-14', '2021-03-15', '2021-03-16', '2021-03-17']
    //         }
    //       ],
    //       yAxis: [
    //         {
    //           type: 'value'
    //         }
    //       ],
    //       series: [
    //         {
    //           name: '新增注册',
    //           type: 'line',
    //           stack: '总量',
    //           areaStyle: {},
    //           emphasis: {
    //             focus: 'series'
    //           },
    //           data: [120, 132, 101, 134, 90, 230, 210]
    //         },
    //         {
    //           name: '付费用户',
    //           type: 'line',
    //           stack: '总量',
    //           areaStyle: {},
    //           emphasis: {
    //             focus: 'series'
    //           },
    //           data: [220, 182, 191, 234, 290, 330, 310]
    //         },
    //         {
    //           name: '活跃用户',
    //           type: 'line',
    //           stack: '总量',
    //           areaStyle: {},
    //           emphasis: {
    //             focus: 'series'
    //           },
    //           data: [150, 232, 201, 154, 190, 330, 410]
    //         },
    //         {
    //           name: '订单数',
    //           type: 'line',
    //           stack: '总量',
    //           areaStyle: {},
    //           emphasis: {
    //             focus: 'series'
    //           },
    //           data: [320, 332, 301, 334, 390, 330, 320]
    //         },
    //         {
    //           name: '当日总收入',
    //           type: 'line',
    //           stack: '总量',
    //           label: {
    //             show: true,
    //             position: 'top'
    //           },
    //           areaStyle: {},
    //           emphasis: {
    //             focus: 'series'
    //           },
    //           data: [820, 932, 901, 934, 1290, 1330, 1320]
    //         }
    //       ]
    //     }
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option)
    //   }
    // })
    // onUnmounted(() => {
    //   myChart.dispose()
    // })
    return {
      ...toRefs(state),
      add,
      subtract
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
.introduce .order {
  display: flex;
  margin-bottom: 50px;
}
.introduce .order .order-item {
  flex: 1;
  margin-right: 20px;
}
.introduce .order .order-item:last-child {
  margin-right: 0;
}
#zoom {
  min-height: 300px;
}

</style>