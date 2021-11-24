<template lang="pug">
  .login
    //- video(src="../assets/login_bg.mp4" muted autoplay loop)
    div
      h2.top Bihar Royal Ranking 
      .form
        el-form(:model="formData")
          el-form-item(label="Account")
            el-input(placeholder="Enter retailer code" v-model="formData.dmsCode")
          el-form-item(label="Password")
            el-input(placeholder="Enter your password" v-model="formData.password" type="password")

        el-button(@click="fn" style="width: 300px;margin-top: 15px;border:none;font-size:1em;font-weight:bold;color:#fff;background-color:#5b8dff;") Login

</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      formData: { dmsCode: '', password: '' }
    }
  },
  methods: {
    async fn () {
      let res = await this._fetch('/login', this.formData, 'post')
      if (res && res.code === 1) {
        localStorage.setItem('MTokenH5', res.data.token)
        // localStorage.setItem('EVENGFRONTUSER', this.formData.username.trim())
        localStorage.setItem('EVENGFRONTUSER', JSON.stringify(res.data || {}));
        this.$store.commit('setStoreData', { key: 'isLogin', value: false })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  padding-top: 150px;
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: fill;
    z-index: 0;
  }
  > div {
    position: relative;
    z-index: 1;
    color: #fff;
  }
  .top {
    margin-bottom: 10px;
    z-index: 1;
    color: #5b8dff;
  }
  .form {
    width: 300px;
    margin: 0 auto;
    z-index: 1;
    ::v-deep .el-form-item__label {
      color: #5b8dff;
      font-size:1em;
      font-weight:bold;
      // padding:0;
      margin: 0;
    }
  }
}
</style>
