<template lang="pug">
  .plat_desc
    .fr
      //- el-button(size="mini" @click="editVisible = true" style="margin-right: 10px;padding: 9 15px;") Add
      el-button(size="mini" @click="downEc" style="margin-right: 10px;padding: 9 15px;") Import template download
      Upload(name="Bulk import" :url="reqBasic + '/admin/shop/import'" @upSus="upSus" :otherData="{}")
    TableCp(ref="tp" :config="config" :hadleEditItemFn="hadleEditItemFn" @ept="ept" @edit="editItem")
    el-dialog(:visible.sync="editVisible" :before-close="editClose" :close-on-click-modal="false")
      el-form(v-model="newStu" label-width="80px" size="mini")
        //- el-form-item(label="班级")
          el-select(v-model="newStu.cid")
            el-option(v-for="(each, idx) in classList" :key="idx" :label="each.name" :value="each.id")
        //- el-form-item(label="学号")
        //-   el-input(v-model="newStu.sno" placeholder="请输入学号")
        //- el-form-item(label="姓名")
        //-   el-input(v-model="newStu.name" placeholder="请输入姓名")
        //- el-form-item(label="班级")
        //-   el-input(v-model="newStu.banji" placeholder="请输入班级")
        //- el-form-item(label="性别")
          el-select(v-model="newStu.sex")
            el-option(label="男" :value="true")
            el-option(label="女" :value="false")
      //- .op-btns
      //-   el-button(@click="editOk" size="mini") 确定
      //-   el-button(@click="editClose" size="mini") 取消
</template>

<script>
import Upload from '@/components/Upload'
import TableCp from '@/components/TableCp'
export default {
  name: 'Student',
  components: { TableCp, Upload },
  data () {
    let query = this.$route.query
    return {
      editVisible: false,
      newStu: { sex: true },
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
          // { name: '编辑', handleSelf: true, fn: 'edit' },
          // { name: '删除', fn: '_del' }
        ],
        tableItems: [
          { name: 'DMS Code', prop: 'dmsCode' },
          { name: 'Password', prop: 'password' },
          { name: 'Retailer Name', prop: 'retailerName' },
          { name: 'Zone', prop: 'zone' },

          { name: 'Client Level', prop: 'clientLevel' },
          { name: 'Currently Rank', prop: 'currentlyRank' },
          { name: 'Last Month Scheme Payout', prop: 'lastMonthSchemePayout', handle: v => {
            let num = (v.lastMonthSchemePayout || 0) - 0
            return num.toLocaleString()
          } },
          { name: 'Current Month Value Target', prop: 'currentlyMonthValueTarget' },
          { name: 'Current Month Value Achievement', prop: 'currentlyMonthValueAchievement' },
          { name: 'Current Month Value Achievement%', prop: 'currentlyMonthValueAchievementPercent' },
          { name: 'Last Month Value Sales', prop: 'lastMonthValueSales', handle: v => {
            let num = (v.lastMonthValueSales || 0) - 0
            return num.toLocaleString()
          } },
          { name: 'MTD Value Growth', prop: 'mtdValueGrowth' },
          { name: 'Current Month Volume Target', prop: 'currentlyMonthVolumeTarget' },
          { name: 'Current Month Volume Achievement', prop: 'currentlyMonthVolumeAchievement' },
          { name: 'Current Month Volume Achievement%', prop: 'currentlyMonthVolumeAchievementPercent' },
          { name: 'Last Month Volume Sales', prop: 'lastMonthVolumeSales', handle: v => {
            let num = (v.lastMonthVolumeSales || 0) - 0
            return num.toLocaleString()
          } },
          { name: 'MTD Volume Growth%', prop: 'mtdVolumeGrowth' },
          { name: 'TL Name', prop: 'tlName' },
          { name: 'TL Contact Number', prop: 'tlContactNumber' },
          { name: 'BM/KAM Name', prop: 'bmKamName' },
          { name: 'BM/KAM Contact Number', prop: 'bmKamContactNumber' },
          { name: 'Update Time', prop: 'updateTime' },

          // { name: 'Club Class', prop: 'clubClass' },
          // { name: 'EV Catgry', prop: 'evCatgry' },
          // { name: 'TL Name', prop: 'tlName' },
          // { name: 'TL Contact Number', prop: 'tlContactNumber' },
          // { name: 'Last Month Sales', prop: 'lastMonthSales' },
          // { name: 'Currently Month Target', prop: 'currentlyMonthTarget' },
          // { name: 'Currently Month Achievement', prop: 'currentlyMonthAchievement' },
          
          // { name: 'Branding Score', prop: 'brandingScore' },
          // { name: 'vivo Share Score', prop: 'vivoShareScore' },
          // { name: 'Repayment Score', prop: 'repaymentScore' },
          // { name: 'Exclusive Store Score', prop: 'exclusiveStoreScore' },
          // { name: 'Sales Score', prop: 'salesScore' },
          // { name: 'Currently Total Score', prop: 'currentlyTotalScore' },
          // { name: 'Currently Rank', prop: 'currentlyRank' },
          // { name: 'Currently Branding Balance', prop: 'currentlyBrandingBalance' },
          // { name: 'Branding Advance Remainder', prop: 'brandingAdvanceRemainder' }
          // // { name: '课程', prop: 'sex', handle: row => row.sex ? '男' : '女' }
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
      this.newStu = item
      this.editVisible = true
    },
    async editOk () {
      let url = this.newStu.id ? '/admin/student/update' : '/admin/student/add'
      this.newStu.cid = this.$route.query.cid
      let res = await this._fetch(url, this.newStu)
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
      // this.newStu = { sex: true }
      this.editVisible = false
    },
    // async getClassList () {
    //   let res = await this._fetch('/admin/classes/list', { pageNum: 1, pageSize: 100 }, 'get')
    //   if (res && res.code == 1 && res.data) {
    //     this.classList = res.data.list || []
    //   }
    // },
    downEc () {
      window.open(this.reqBasic + '/admin/shop/import/template')
    },
    hadleEditItemFn (data, row) {
      return {
        ...data, status: data.status || false, category: 'notify'
      }
    },
    ept (row) {
      this._goUrl('/stu', { query: { cid: row.id, cname: row.name } })
    },
    upSus (res) {
      if (res && res.code == 1) this.$refs.tp._getList()
      else this._messageTip(res && res.msg || 'Bulk import failed')

      if (res && res.data) this._messageTip(res && res.data || 'Bulk import success', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.plat_desc {
  ::v-deep .el-table {
    th {
      min-width: 150px;
      width: 150px;
    }
  }
}
</style>
