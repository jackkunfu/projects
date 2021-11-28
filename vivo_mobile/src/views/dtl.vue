<template>
  <div>
    <div class="top">
      <div class="title">{{ detail.title }}</div>
      <div class="sub">Issue Date: {{ detail.createtime }}</div>
    </div>
    <div v-html="detail.content"></div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      id: this.$route.query.id,
      detail: {}
    }
  },
  created () {
    this.getDtl()
  },
  methods: {
    async getDtl () {
      let res = await this._fetch('/api/article', { id: this.id }, 'get')
      if (res && res.code === 1) {
        this.detail = res.data || {}
        this.detail.createtime = timeStr(this.detail.createtime)
      }
    }
  }
}

function timeStr(v) {
  return (v || '').substr(0, 19).replace(/T/, ' ')
}
</script>

<style scoped>
.top {
  border-bottom: 1px solid #eee;
  text-align: center;
  margin-bottom: 1em;
  padding: 0.5em;
}
.title {
  height: 2em;
  font-size: 1.5em;
  line-height: 2em;
}
.sub {
  height: 2em;
  font-size: 0.9em;
  line-height: 1.5em;
  color: #888;
}
</style>