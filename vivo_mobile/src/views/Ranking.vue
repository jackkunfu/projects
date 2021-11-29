<template>
  <div class="rank">
    <div class="top">
      <p class="name">VIVO</p>
      <p class="sub">{{ shop.retailerName || '--' }}</p>
    </div>

    <div class="blue" style="height: 3em;padding-top: 0.75em;">
      <div class="half">Client Level:
        <span class="white">{{ shop.clientLevel || '' }}</span>
      </div>
      <div class="half">Current Rank:
        <span class="white">{{ shop.currentlyRank || '' }}</span>
      </div>
    </div>

    <div class="f_b" style="height: 2em;padding-top: 0.5em;">{{ shop.lastMonthSchemePayout || 0 }}</div>
    <div class="f_s blue">Last Month Scheme Payout</div>

    <div class="f_b" style="height: 2em;padding-top: 0.5em;">{{ shop.currentlyMonthValueTarget || 0 }}</div>
    <div class="f_s blue">Current Month Value Target</div>

    <div class="box">
      <div style="border-bottom: 1px solid #eee;padding-top: 0.8em;">
        <div class="half line">
          <div class="f_b">{{ shop.currentlyMonthValueAchievement || 0 }}</div>
          <div class="f_s">Current Month Value Achievement</div>
        </div>
        <div class="half">
          <div class="f_b">{{ shop.currentlyMonthValueAchievementPercent || '0%' }}</div>
          <div class="f_s">Current Month Value Achievement %</div>
        </div>
      </div>

      <div style="padding-bottom: 0.8em;">
        <div class="half line">
          <div class="f_b">{{ shop.lastMonthValueSales || 0 }}</div>
          <div class="f_s">Last Month Value Sales</div>
        </div>
        <div class="half">
          <div class="f_b">{{ shop.mtdValueGrowth || '0%' }}</div>
          <div class="f_s">MTD Value Growth %</div>
        </div>
      </div>
    </div>

    <div class="f_b grey" style="height: 2em;padding-top: 0.5em;">{{ shop.currentlyMonthVolumeTarget || 0 }}</div>
    <div class="f_s">Current Month Volume Target</div>

    <div class="box grey">
      <div style="border-bottom: 1px solid #fff;padding-top: 0.8em;">
        <div class="half line">
          <div class="f_b">{{ shop.currentlyMonthVolumeAchievement || 0 }}</div>
          <div class="f_s">Current Month Volume Achievement</div>
        </div>
        <div class="half">
          <div class="f_b">{{ shop.currentlyMonthVolumeAchievementPercent || '0%' }}</div>
          <div class="f_s">Current Month Volume Achievement %</div>
        </div>
      </div>

      <div style="padding-bottom: 0.8em;">
        <div class="half line">
          <div class="f_b">{{ shop.lastMonthVolumeSales || 0 }}</div>
          <div class="f_s">Last Month Volume Sales</div>
        </div>
        <div class="half">
          <div class="f_b">{{ shop.mtdVolumeGrowth || '0%' }}</div>
          <div class="f_s">MTD Volume Growth %</div>
        </div>
      </div>
    </div>

    <!-- <div class="grey ul">
      <div>
        <div class="half">
          <div class="f_s bold">Sales Score</div>
          <div class="white">{{ shop.salesScore || 0 }}</div>
        </div>
        <div class="half">
          <div class="f_s bold">Exclusive Store Score</div>
          <div class="white">{{ shop.exclusiveStoreScore || 0 }}</div>
        </div>
      </div>

      <div>
        <div class="half">
          <div class="f_s bold">Branding Score</div>
          <div class="white">{{ shop.brandingScore || 0 }}</div>
        </div>
        <div class="half">
          <div class="f_s">vivo Share Score</div>
          <div class="white">{{ shop.shareScore || 0 }}</div>
        </div>
      </div>

      <div>
        <div class="half">
          <div class="f_s bold">Repayment Score</div>
          <div class="white">{{ shop.repaymentScore || 0 }}</div>
        </div>
        <div class="half">
          <div class="f_s">Current Total Score</div>
          <div class="white">{{ shop.currentlyTotalScore || 0 }}</div>
        </div>
      </div>

      <div>
        <div class="half">
          <div class="f_s bold">Current Branding Balance</div>
          <div class="white">{{ shop.currentlyBrandingBalance || 0 }}</div>
        </div>
        <div class="half">
          <div class="f_s">Branding Advance Remainder</div>
          <div class="white">{{ shop.brandingAdvanceRemainder || 0 }}</div>
        </div>
      </div>
    </div> -->

    <!-- <div>
      <b-table striped hover :items="items"></b-table>
    </div> -->

    <div class="btm">
      <ul>
        <li>
          <div class="half line">TL Name:</div> 
          <div class="half">{{ shop.tlName }}</div> 
        </li>
        <li>
          <div class="half line">TL Contact Number:</div> 
          <div class="half">{{ shop.tlContactNumber }}</div> 
        </li>
        <li>
          <div class="half line">BM/KAM Name:</div> 
          <div class="half">{{ shop.bmKamName }}</div> 
        </li>
        <li>
          <div class="half line">BM/KAM Contact Number:</div> 
          <div class="half">{{ shop.bmKamContactNumber }}</div>
        </li>
      </ul>
    </div>

    <div class="up_time">Update Time:
      <span>{{ shop.updateTime }}</span>
    </div>

    <div style="text-align: center;padding-bottom: 2em;">
      <div class="log_out" @click="logout">Logout</div>
      <!-- <b-col cols="8" style="margin: 1em auto;border-radius: 1em;"><b-button block variant="danger" size="lg" @click="logout">Logout</b-button></b-col> -->
    </div>
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
          this.shop = data.shop || {}

          // var rank = data.rank || []
          // var items = rank.map(el => {
          //   let { currentlyRank, clubClass, currentlyMonthAchievement, currentlyTotalScore } = el
          //   return {
          //     RankNo: currentlyRank,
          //     ClubCLass: clubClass,
          //     CurrentMonthAchievement: st(currentlyMonthAchievement),
          //     CurrentTotalScore: st0(currentlyTotalScore)
          //   }
          // })
          // console.log(items)
          // this.items = items
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
  text-align: center;
  .log_out {
    width: 60%;
    margin: 1em auto;
    font-size: 1.3em;
    line-height: 2.4em;
    color: #fff;
    border-radius: 1.2em;
    background-color: #dc3545;
  }
  .top {
    background-color: #5b8dff;
    height: 10em;
    color: #fff;
    font-weight: bold;
    padding: 0.5em;
    text-align: left;
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
    &.line {
      border-right: 1px solid #eee;
    }
  }
  .blue {
    background-color: #dbecf7;
  }
  .f_b {
    font-size: 1.8em;
    line-height: 1;
    font-weight: bold;
  }
  .f_s {
    font-size: 0.8em;
    line-height: 2;
    color: #666;
    &.bold {
      color: #000;
    }
  }
  .grey {
    background-color: #eee;
  }
  .white {
    background: #fff;
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 0.2em;
    font-weight: bold;
    padding: 0 0.5em;
    min-width: 2.6em;
  }
  .box {
    &.grey {
      .line {
        border-right: 1px solid #fff;
      }
      .half {
        padding: 0.5em 0;
        .f_s {
          padding: 0 1.2em;
        }
      }
    }
    .half {
      padding: 0.5em 0;
      .f_s {
        padding: 0 1.55em;
      }
      vertical-align: middle;
    }
    .f_b {
      font-size: 1.6em;
    }
    .f_s {
      text-align: left;
      line-height: 1.2;
      margin-top: 0.5em;
    }
  }
  .ul {
    padding: 0.5em 0 1em;
    .f_s {
      margin-bottom: 0.4em;
      margin-top: 0.5em;
    }
    .white {
      width: 9em;
      line-height: 2;
      height: 2em;
    }
  }
  .btm {
    ul {
      margin: 0.5em 0;
      padding: 0;
      border-top: 1px solid #ccc;
      li {
        margin: 0;
        padding: 0;
        width: 100%;
        display: block;
        height: 2.5em;
        line-height: 2.5em;
        float: none;
        text-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 0.8em;
        font-weight: bold;
        &:nth-of-type(2n) {
          background-color: #eee;
        }
        .line {
          border-right: 1px solid #ccc;
          font-weight: normal;
        }
      }
    }
  }
  .up_time {
    text-align: left;
    padding: 1em;
    span {
      color: #dc3545;
    }
  }
}
</style>
