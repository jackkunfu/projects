<style scoped>
.top {
  border-bottom: 1px solid #eee;
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
  <div>
    <div class="top">
      <div class="half" @click="curTab = 1" :class="{ 'cur': curTab === 1 }">Ranking</div>
      <div class="half" @click="curTab = 2" :class="{ 'cur': curTab === 2 }">news</div>
    </div>
    <div v-if="curTab === 1">
      <Ranking />
    </div>
    <div v-if="curTab === 2">
      <News />
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
        items: [
          { RankNo: 50, ClubCLass: 'UR', CurrentMonthAchievement: 'Macdonald' ,CurrentTotalScore:'111'},
          { RankNo: 500, ClubCLass: 'SSR', CurrentMonthAchievement: 'Macdonald' ,CurrentTotalScore:'111'},
          { RankNo: 600, ClubCLass: 'SSR', CurrentMonthAchievement: 'Macdonald' ,CurrentTotalScore:'111'},
          { RankNo: 1200, ClubCLass: 'D', CurrentMonthAchievement: 'Macdonald' ,CurrentTotalScore:'111'}
        ],
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


<style scoped>
.list0{
  width:100%;
  overflow: hidden;
  /* border:1px solid #ccc; */
  background-color: #d8ecf7;
  padding: 0px;
  margin: 0;

}
.list0 li{
  float:left;
  width: 50%;
  /* border:1px solid tomato; */
  padding: 12px 8px;
  background-color: #413b3d;
}
.list0 li >lable{
  font-size: 1em;
  font-family: 'Courier New', Courier, monospace;
  font-weight:bold;
  padding:5px 15px 5px 10px;
  background-color: white;
  border:1px solid #e2ca84;
  margin-left:5px;
  border-radius: 5px;
}
.list0 li span{
  color: white;
  font-size: 0.8em;
  font-weight: bold;
}

.list1{
  width:100%;
  overflow: hidden;
  /* border:1px solid #ccc; */
  background-color: #d8ecf7;
  padding: 0px;
  margin: 0;
  /* border:1px solid green; */
}
.list1 li{
  float:left;
  width: 25%;
  /* border:1px solid tomato; */
  padding: 12px 0 12px 0;
  background-color: #d8ecf7;
  border-right:1px dashed #000;
}
.list1 li >p{
  font-size: 0.7em;
  font-family: 'Courier New', Courier, monospace;
  font-weight:bold;
  text-align: center;
  /* padding:5px 20px 5px 15px; */
  /* background-color: white; */
  /* border:1px solid #e2ca84; */
}
.list1 li span{
  /* font-size: 1.4em; */
  font-weight: bold;
  /* margin-left: 45%; */
}

.list{
  width:100%;
  overflow: hidden;
  /* border:1px solid #ccc; */
  background-color: #d8ecf7;
  padding: 5px;
}
.list li{
  float:left;
  width: 50%;
  /* border:1px solid tomato; */
  padding: 5px 0;
}
.list li >lable{
  font-size: 0.8em;
  font-family: 'Courier New', Courier, monospace;
  font-weight:bold;
}
.list li span{
  /* color: red; */
}
.list li >p{
  width: 90%;
  color: #000;
  /* border:1px solid red; */
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #413b3d;
  padding: 10px;
  margin: 5px 0;
}
</style>>