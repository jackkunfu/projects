<template lang="pug">
  .plat_desc
    .fr
      el-button(size="mini" @click="editItem()" style="margin-right: 10px;padding: 9 15px;") Add news

    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @edit="editItem")

    el-dialog(:visible.sync="editVisible" :before-close="editClose" :close-on-click-modal="false")
      el-form(v-model="newItem" label-width="80px" size="mini")
        el-form-item(label="Conetent")
          Editor(v-model="newItem.content")
      .op-btns
        el-button(@click="editOk" size="mini") 确定
        el-button(@click="editClose" size="mini") 取消
</template>

<script>
import Upload from '@/components/Upload'
import TableCp from '@/components/TableCp'
import Editor from '@/components/Wangeditor'
export default {
  name: 'News',
  components: { TableCp, Upload, Editor },
  data () {
    let query = this.$route.query
    return {
      editVisible: false,
      newItem: { sex: true },
      classList: [],
      config: {
        tbIndex: true,
        apis: {
          list: { url: '/admin/shop/list' },
          del: { url: '/admin/shop/delete' },
          add: { url: '/admin/shop/add' },
          edit: { url: '/admin/shop/update' }
        },
        operates: [
          { name: '编辑', handleSelf: true, fn: 'edit' },
          { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: 'DMS Code', prop: 'dmsCode' },
          { name: 'Retailer Name', prop: 'retailerName' },
          { name: 'Club Class', prop: 'clubClass' },
          { name: 'EV Catgry', prop: 'evCatgry' },
          { name: 'TL Name', prop: 'tlName' },
          { name: 'TL Contact Number', prop: 'tlContactNumber' },
          { name: 'Last Month Sales', prop: 'lastMonthSales' },
          { name: 'Currently Month Target', prop: 'currentlyMonthTarget' },
          { name: 'Currently Month Achievement', prop: 'currentlyMonthAchievement' },
          { name: 'Last Month Scheme Payout', prop: 'lastMonthSchemePayout' },
          { name: 'Branding Score', prop: 'brandingScore' },
          { name: 'vivo Share Score', prop: 'vivoShareScore' },
          { name: 'Repayment Score', prop: 'repaymentScore' },
          { name: 'Exclusive Store Score', prop: 'exclusiveStoreScore' },
          { name: 'Sales Score', prop: 'salesScore' },
          { name: 'Currently Total Score', prop: 'currentlyTotalScore' },
          { name: 'Currently Rank', prop: 'currentlyRank' },
          { name: 'Currently Branding Balance', prop: 'currentlyBrandingBalance' },
          { name: 'Branding Advance Remainder', prop: 'brandingAdvanceRemainder' }
          // { name: '课程', prop: 'sex', handle: row => row.sex ? '男' : '女' }
        ],
        seachOpt: { cid: query.cid },
        editKeys: [
          // { label: '班级名称', key: 'cid', select: true, list: [] },
          { label: '学号', key: 'sno' },
          { label: '姓名', key: 'name' },
          { label: '性别', key: 'banji' }
          // { label: '性别', key: 'sex', select: true, list: [{ label: '男', value: true }, { label: '女', value: false }] }
        ]
      }
    }
  },
  created () {
    // this.getClassList()
  },
  methods: {
    editItem (item) {
      if(item) this.newItem = item
      this.editVisible = true
    },
    async editOk () {
      let url = this.newItem.id ? '/admin/news/update' : '/admin/news/add'
      let res = await this._fetch(url, this.newItem)
      if (res) {
        if (res.code == 1) {
          this._messageTip(res.msg || '操作成功', 1)
          this.$refs.tp._getList()
        }
        else this._messageTip(res.msg || '操作失败')
        this.editClose()
      }
    },
    editClose () {
      // this.newItem = { sex: true }
      this.editVisible = false
    },
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'notify'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
