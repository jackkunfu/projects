<style scoped>
.list {
  padding-top: 2.5em;
  height: 100%;
  overflow: auto;
}
.top {
  border-bottom: 1px solid #eee;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
}
.list > .main {
  height: 100%;
}
.half {
  width: 50%;
  display: inline-block;
  text-align: center;
  line-height: 2.5em;
  /* font-size: 0.8em; */
  border-bottom: 0.2em solid transparent;
}
.half.cur {
  border-bottom: 0.2em solid #007AFB;
}
</style>

<template>
  <div class="list">
    <div class="top">
      <div class="half" @click="curTab = 1" :class="{ 'cur': curTab === 1 }">Ranking</div>
      <div class="half" @click="curTab = 2" :class="{ 'cur': curTab === 2 }">news</div>
    </div>
    <div class="main">
      <div v-if="curTab === 1">
        <Ranking />
      </div>
      <div v-if="curTab === 2">
        <News />
      </div>
    </div>
  </div>
</template>

<script>
  import Ranking from './Ranking.vue'
  import News from './News.vue'

  export default {
    name: 'List1',
    components: { Ranking, News },
    data() {
      return {
        curTab: 1,
        retailer: { name: 'AJANTA MOBILE CENTER', role: 'UR' },
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        items: [],
        shop: {}
      }
    },
    created () {
      this.getList()
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      logout(){
        this.goLogin()
      },
      async getList () {
        let res = await this._fetch('/api/shop', '', 'get')
        if (res && res.code === 1) {
          var data = res.data || {}
          var rank = data.rank || []
          var items = rank.map(el => {
            let { currentlyRank, clubClass, currentlyMonthAchievement, currentlyTotalScore } = el
            return {
              RankNo: currentlyRank,
              ClubCLass: clubClass,
              CurrentMonthAchievement: st(currentlyMonthAchievement),
              CurrentTotalScore: st0(currentlyTotalScore)
            }
          })
          console.log(items)
          this.items = items
          var shop = data.shop || {}
          this.shop = shop
          this.shop.currentlyMonthTarget = st(this.shop.currentlyMonthTarget)
          this.shop.currentlyMonthAchievement = st(this.shop.currentlyMonthAchievement)
          this.shop.lastMonthSales = st(this.shop.lastMonthSales)
          this.shop.lastMonthSchemePayout = st(this.shop.lastMonthSchemePayout)
          this.shop.salesScore = st0(this.shop.salesScore)
          this.shop.currentlyTotalScore = st0(this.shop.currentlyTotalScore)
          this.shop.currentlyBrandingBalance = st(this.shop.currentlyBrandingBalance)
          this.shop.brandingAdvanceRemainder = st(this.shop.brandingAdvanceRemainder)
          this.shop.currentlyMonthAchievement = st(this.shop.currentlyMonthAchievement)
          this.shop.exclusiveStoreScore = st0(this.shop.exclusiveStoreScore)
          this.shop.brandingScore = st0(this.shop.brandingScore)
          this.shop.vivoShareScore = st0(this.shop.vivoShareScore)
          this.shop.repaymentScore = st0(this.shop.repaymentScore)
        }
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
