<template>
  <div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id" @click="goDtl(item.id)">
        <div class="l">{{ item.title }}</div>
        <div class="r">{{ item.createtime }}</div>
      </div>
    </div>
    <el-pagination
      class="page"
      layout="prev, pager, next" :total="pData.total"
      @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data() {
      return {
        list: [],
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

          this.list = (data.list || []).map(el => {
            el.createtime = timeStr(el.createtime)
            return el
          })

          this.pData.total = data.total || 0
        }
      },
      goDtl (id) {
        this._goUrl('/dtl', { query: { id: id } })
      }
    }
  }

  function timeStr(v) {
    return (v || '').substr(0, 19).replace(/T/, ' ')
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
  border-bottom: 1px solid #eee;
}
.item .l {
  float: left;
  white-space: nowrap;
  max-width: 8em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item .r {
  float: right;
  color: #888;
}
.page {
  text-align: center;
  padding: 2em 0;
}
</style>