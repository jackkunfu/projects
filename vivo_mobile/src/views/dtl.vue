<template>
  <div>
    <div class="top">
      <div class="title">{{ detail.title }}</div>
      <div class="sub">Issue Date: {{ detail.createTime }}</div>
    </div>
    <div v-html="detail.content"></div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data() {
      let id = this.$route.query.id
      return {
        id: id,
        detail: {}
      }
    },
    created () {
      this.getList()
    },
    methods: {
      async getDtl () {
        let res = await this._fetch('/api/news/detail', { id: this.id }, 'get')
        if (res && res.code === 1) {
          this.detail = res.data || {}
        }
      },
      goDtl (id) {
        this._goUrl('/dtl', { id: id })
      }
    }
  }

  function st (v) {
    return ((v || 0) - 0).toFixed(0)
  }
  function st0 (v) {
    return ((v || 0) - 0).toFixed(2)
  }
</script>

<style scoped>
.top {
  border-bottom: 1px solid #666;
  text-align: center;
  margin-bottom: 0.5em;
}
.title {
  height: 3em;
  font-size: 1.5em;
  line-height: 2em;
}
.sub {
  height: 3em;
  font-size: 0.9em;
  line-height: 1.5em;
}
</style>