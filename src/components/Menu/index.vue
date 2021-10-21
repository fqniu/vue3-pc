<template>
  <div>

  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'index',
  components: {},
  props: {},
  setup(props) {
    const route = useRoute()
    const state = reactive({

    })
    const methods = {
      handleClick: () => {
        console.log('111');
      }
    }
    return {
      ...toRefs(state),
      ...methods
    }
  }
}
</script>

<style  lang="scss" scoped>
</style>