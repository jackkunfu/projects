<template lang="pug">
  .plat_desc
    .fr
      el-button(@click="showAdd") Add admin
    TableCp(:config="config" ref="TableCp" :editCheck="editCheck")
</template>

<script>
import TableCp from '@/components/TableCp'
import Upload from '@/components/Upload'

export default {
  name: 'AdminManage',
  components: { TableCp, Upload },
  data () {
    return {
      config: {
        apis: {
          list: { url: '/admin/user/list' },
          del: { url: '/admin/user/delete', idKey: 'id' },
          add: { url: '/admin/user/add' },
          edit: { url: '/admin/user/update', idKey: 'id' }
        },
        operates: [
          { name: 'Edit', fn: '_edit' },
          { name: 'Delete', fn: '_del' }
        ],
        tableItems: [
          { name: 'Name', prop: 'name' },
          { name: 'Phone', prop: 'phone' },
          { name: 'Account', prop: 'username' },
          { name: 'Update time', handle: (row, list) => row.createtime.slice(0, 16) }
        ],
        seachOpt: { name: '' },
        editKeys: [
          { label: 'Name', key: 'name' },
          { label: 'Phone', key: 'phone' },
          { label: 'Role', key: 'auth', select: true, list: [{ label: 'admin', value: 'admin' }] },
          { label: 'Account', key: 'username' },
          { label: 'Password', key: 'password' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    showAdd () {
      this.$refs.TableCp.isAdd = true
    },
    editCheck (data) {
      let res = { ok: false, msg: '' }
      // if () 
      return { ok: true }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
