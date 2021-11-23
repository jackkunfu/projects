<template>
  <div>
    <div class="item" v-for="item in list" :key="item.id" @click="goDtl(item.id)">
      <div class="l">{{ item.name }}</div>
      <div class="r">{{ item.createTime }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data() {
      return {
        list: [
          { name: 50, createTime: 'xxxx-xx-xx' },
          { name: 50, createTime: 'xxxx-xx-xx' },
          { name: 50, createTime: 'xxxx-xx-xx' },
          { name: 50, createTime: 'xxxx-xx-xx' }
        ],
        shop: {}
      }
    },
    created () {
      this.getList()
    },
    methods: {
      async getList () {
        let res = await this._fetch('/api/news/list', {}, 'get')
        if (res && res.code === 1) {
          this.list = res.data || []
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
.item {
  height: 3em;
  line-height: 3em;
  padding: 0 1em;
  border-bottom: 1px solid #666;
}
.item .l {
  float: left;
}
.item .r {
  float: right;
}
</style>