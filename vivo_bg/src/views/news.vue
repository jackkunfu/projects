<template lang="pug">
  .plat_desc
    .fr
      el-button(size="mini" @click="editItem()" style="margin-right: 10px;padding: 9 15px;") Add news

    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @edit="editItem")

    el-dialog(:visible.sync="editVisible" :before-close="editClose" :close-on-click-modal="false")
      el-form(v-model="newItem" label-width="80px" size="mini")
        el-form-item(label="Title")
          el-input(v-model="newItem.title")
        //- el-form-item(label="是否展示")
          el-switch(v-model="newItem.isShow")
        el-form-item(label="Content")
          Editor(v-model="newItem.content")
      .op-btns
        el-button(type="primary" @click="editOk" size="mini") OK
        el-button(@click="editClose" size="mini") Cancel
</template>

<script>
import Upload from '@/components/Upload'
import TableCp from '@/components/TableCp'
import Editor from '@/components/Wangeditor'
import { createTimeStr } from '@/js/fn.js'
export default {
  name: 'News',
  components: { TableCp, Upload, Editor },
  data () {
    return {
      editVisible: false,
      newItem: {},
      config: {
        tbIndex: true,
        apis: {
          list: { url: '/admin/article/list' },
          del: { url: '/admin/article/delete' },
          add: { url: '/admin/article/add' },
          edit: { url: '/admin/article/update' }
        },
        operates: [
          { name: 'Edit', handleSelf: true, fn: 'edit' },
          { name: 'Delete', fn: '_del' }
        ],
        tableItems: [
          { name: 'Title', prop: 'title' },
          { name: 'CreateTime', prop: 'createtime', handle: v => createTimeStr(v && v.createtime) }
        ],
      }
    }
  },
  methods: {
    editItem (item) {
      if(item) this.newItem = item
      this.editVisible = true
    },
    async editOk () {
      let { add, edit } = this.config.apis
      let url = this.newItem.id ? edit.url : add.url
      let res = await this._fetch(url, this.newItem)
      if (res) {
        if (res.code == 1) {
          this._messageTip(res.msg || 'Success', 1)
          this.$refs.tp._getList()
        }
        else this._messageTip(res.msg || 'Fail')
        this.editClose()
      }
    },
    editClose () {
      this.newItem = {}
      // this.newItem.title = ''
      // this.newItem.content = ''
      this.editVisible = false
    },
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'article'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
