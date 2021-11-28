<template>
  <div class="rank">
    <div class="top">
      <p class="name">{{ shop.retailerName }}</p>
      <p class="sub">{{ shop.clubClass || 'afdas HSF SREHsfdjsnj' }}</p>
    </div>
    <div>
      <ul class="list0">
        <li><span>Catagory:</span><lable> {{ shop.evCatgry }}</lable></li>
        <li><span>Current Rank:</span><lable> {{ shop.currentlyRank }}</lable></li>
      </ul>
    </div>
    <div>
      <ul class="list1">
        <li><p style="font-weight:bold;font-size:1.1em;">{{ shop.currentlyMonthTarget }}</p><p> Current Month Target</p></li>
        <li><p style="font-weight:bold;font-size:1.1em;">{{ shop.currentlyMonthAchievement }}</p><p> Current Month Achievement</p></li>
        <li><p style="font-weight:bold;font-size:1.1em;">{{ shop.lastMonthSales }}</p><p> Last Month Sales</p></li>
        <li style="border-right:none;"><p style="font-weight:bold;font-size:1.1em;">{{ shop.lastMonthSchemePayout }}</p><p> Last Month Scheme Payout</p></li>
      </ul>
    </div>

    <div>
      <ul class="list">
        <li><lable><span>Sale</span> Score:</lable><p>{{ shop.salesScore || 0 }}</p></li>
        <li><lable>Exclusive Store Score:</lable><p>{{ shop.exclusiveStoreScore|| 0 }}</p></li>
        <li><lable>Branding Score:</lable><p>{{ shop.brandingScore || 0 }}</p></li>
        <li><lable>vivo Share Score</lable><p>{{ shop.vivoShareScore}}</p></li>
        <li><lable>Repayment Score:</lable><p>{{ shop.repaymentScore}}</p></li>
        <li><lable>Current Total Score:</lable><p>{{ shop.currentlyTotalScore}}</p></li>
        <li><lable style="padding-right:1px;">Current Branding Balance:</lable><p>{{ shop.currentlyBrandingBalance}}</p></li>
        <li><lable>Branding Advance Remainder:</lable><p>{{ shop.brandingAdvanceRemainder}}</p></li>
        <!-- <li><lable>TL Name:</lable><p>ANURAG KUMAR SINGH</p></li>
        <li><lable>TL Contact Number:</lable><p>EC0002235</p></li> -->
      </ul>
    </div>

    <div>
      <b-table striped hover :items="items"></b-table>
    </div>

    <div>
      <ul>
        <li><lable>TL Name:</lable><p>{{ shop.tlName }}</p></li>
        <li><lable>TL Contact Number:</lable><p>{{ shop.tlContactNumber }}</p></li>
        <li><lable>Update time:</lable><p style="color:red;">{{ shop.dateTime }}</p></li>
      </ul>
    </div>

    <div>
      <b-col cols="8"><b-button block variant="danger" size="lg" @click="logout">Logout</b-button></b-col>
    </div>

    <!-- <b-row style="margin:50px;" align-h="center"> -->
    <!-- </b-row> -->
  </div>
</template>

<script>
  export default {
    name: 'List1',
    data() {
      return {
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

<style lang="scss" scoped>
.rank {
  .top {
    background-color: #5b8dff;
    height: 10em;
    color: #fff;
    font-weight: bold;
    padding: 0.5em;
    .name {
      font-size: 2em;
    }
    .sub {
      font-size: 1.3em;
    }
  }
  .half {
    width: 50%;
    display: inline-block;
    text-align: center;
  }
  .blue {
    background-color: #dbecf7;
  }
  .f_bg {
    font-size: 1.8em;
  }
}
</style>


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