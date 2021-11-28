<template lang="pug">
  el-container.ctn
    el-container
      el-main
        .main-ctn
          router-view
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  overflow: auto;
  height: 100%;
}
.main-ctn {
  height: 100%;
  position: relative;
}
</style>
