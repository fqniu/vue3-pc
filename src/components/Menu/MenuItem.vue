<template>
  <div></div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'MenuItem',
  components: {},
  props: {},
  setup(props) {
    const route = useRoute()
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style  lang="scss" scoped>
</style>