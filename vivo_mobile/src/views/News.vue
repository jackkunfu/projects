<template>
  <div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id" @click="goDtl(item.id)">
        <div class="l">{{ item.name }}</div>
        <div class="r">{{ item.createTime }}</div>
      </div>
    </div>
    <el-pagination
      layout="prev, pager, next" :total="1000"
      @current-change="pageChange">
    </el-pagination>
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
        pData: { cur: 1, total: 0 },
        shop: {}
      }
    },
    created () {
      this.getList(1)
    },
    methods: {
      pageChange (v) {
        this.getList(v)
      },
      async getList (p) {
        this.pData.cur = p
        let res = await this._fetch('/api/article/list', {
          pageSize: 20, pageNum: p
        }, 'get')
        if (res && res.code === 1) {
          let data = res.data || {}

          this.list = data.list || []

          this.pData.total = data.total || 0
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