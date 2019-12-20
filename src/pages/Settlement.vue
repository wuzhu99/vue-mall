<template>
  <div class="Settlement">
    <div class="header">
      <span @click="$router.back()" class="icon">&#xe69e;</span>
      订单页
    </div>
    <router-link tag="p" to="/Address" class="addAddress addAddressTop">
      <span class="adress">收货地址：</span>
      {{this.user.address[0]}}
    </router-link>
    <p class="addAddress">
      <span class="adress">收货号码：</span>
      {{this.user.phone}}
    </p>
    <div class="content">
      <div
        class="content-item"
        :key="settlementItem.id"
        v-for="settlementItem of Settlement"
        @touchstart="toDetail(settlementItem)"
      >
        <router-link :to="'/detail/'+settlementItem.id">
          <img :src="settlementItem.coverPath" alt />
        </router-link>
        <div class="content-info">
          <router-link @click="toDetail(settlementItem)" :to="'/detail/'+settlementItem.id">
            <h1 class="title">{{settlementItem.name}}</h1>
          </router-link>
          <p class="dingdanId">订单号：{{settlementItem.id}}</p>
          <p>
            <span class="price">￥{{settlementItem.saleprice}}</span> *
            <span class="price">{{settlementItem.count}}</span>
          </p>
          <span class="sum">
            <i>小计：￥</i>
            {{(settlementItem.saleprice*settlementItem.count).toFixed(2)}}
          </span>
        </div>
      </div>
      <div class="total">
        <div class="btn">
          <span>合计：</span>
          <span class="total-sum">
            <i>￥</i>
            {{allPrice.toFixed(2)}}
          </span>
        </div>
        <p class="ppay">请选择支付方式：</p>
        <div class="pay">
          <span class="icon weixin">&#xe637;</span>
          <span class="icon zhifubao">&#xe629;</span>
          <span class="icon yinglain">&#xe615;</span>
          <span class="icon zaixian">&#xe613;</span>
        </div>
        <button @click="handleclicktotal">待支付</button>
      </div>
    </div>
    <h4 class="tuijian">猜你喜欢</h4>
    <div class="products">
      <div class="product" :key="item.id" v-for="item of this.data" @click="toDetail(item)">
        <router-link :to="'/detail/'+item.id">
          <div class="pic">
            <img :src="item.coverPath" alt />
          </div>
          <div class="pro">
            <div class="pro-top">
              <p>
                <i>￥</i>
                {{item.saleprice}}
              </p>
              <span class="icon">&#xe769;</span>
            </div>
            <p class="pro-bottom">{{item.name}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Indicator
} from 'mint-ui'
import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  name: 'Settlement',
  data () {
    return {
      List: [],
      data: ''
    }
  },
  methods: {
    handleclicktotal () {
      Indicator.open({
        text: '请付款',
        spinnerType: 'double-bounce'
      })
      setTimeout(() => {
        Indicator.close()
      }, 1500)
    },
    ...mapMutations(['toDetail'])
  },
  computed: {
    ...mapGetters(['allPrice']),
    ...mapState(['user', 'Settlement'])
  },
  created () {
    let currentPage = 2
    this.$http.get(process.env.API_HOST + `/search?&page=${currentPage}&format=json`)
      .then(resp => {
        if (resp.status === 200 && resp.statusText === 'OK') {
          this.data = resp.data.jsondata.data.searchResult.commodities
          this.data.map(item => {
            if (item.coverPath.charAt(0) === '/') {
              item.coverPath = 'http:' + item.coverPath
            }
          })
          this.currentPage = resp.data.jsondata.data.searchResult.page.currentPage
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.Settlement {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 45px;
  z-index: 100;
  background: #eb2929;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 45px;
  top: 0;
  position: fixed;
  border-bottom: 1px solid #dedede;
  .icon {
    display: block;
    position: absolute;
    color: #fff;
    font-size: 20px;
    padding: 0 15px;
  }
}
.addAddress {
  margin: 3%;
  width: 94%;
  font-size: 12px;
  border: none;
  padding: 4% 2%;
  display: block;
  box-sizing: border-box;
  background-color: #f2f2f2;
  border-radius: 5px;
  .adress {
    font-weight: bold;
  }
}
.addAddressTop {
  margin-top: 55px;
}
.emptyAddress {
  text-align: center;
}
.content {
  width: 100%;
  overflow: hidden;
  padding-bottom: 45px;
  background: #f2f2f2;
}
.content-item {
  position: relative;
  width: 100%;
  height: 100px;
  margin-bottom: 2%;
  padding: 0 2%;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #dedede;
  border-width: 1px 0;
  img {
    float: left;
    width: 70px;
    height: 70px;
    border: 1px solid #dedede;
    margin: 12px 5px;
  }
  .content-info {
    float: left;
    font-size: 12px;
    padding: 10px 5px;
    width: 60%;
    h1 {
      line-height: 20px;
      font-size: 12px;
      color: #333;
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .dingdanId {
      color: #333;
    }
    .price {
      line-height: 20px;
      font-size: 14px;
      color: #f33;
      i {
        font-size: 12px;
        color: gray;
      }
    }
    .conputed {
      width: 100%;
      display: inline-block;
      width: 79px;
      border: 1px solid #dedede;
      height: 25px;
      margin-top: 5px;
      span {
        display: inline-block;
        width: 23px;
        height: 25px;
        line-height: 25px;
        text-align: center;
      }
      .count {
        border: 1px solid #dedede;
        border-width: 0 1px;
      }
    }
    .sum {
      color: #eb2929;
    }
  }
}
.total {
  padding-left: 4%;
  background-color: #fff;
  .btn {
    width: 240px;
    height: 52px;
    line-height: 52px;
    font-size: 14px;
    color: #333;
    span {
      display: inline-block;
    }
    .total-sum {
      color: #f33;
    }
  }
  .ppay {
    font-size: 14px;
    color: #333;
  }
  .pay {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    font-size: 30px;
    .weixin {
      color: #00b040 !important;
    }
    .zhifubao {
      color: #33ccff !important;
    }
    .yinglain {
      color: #217b83 !important;
    }
    .zaixian {
      color: rgb(255, 205, 95) !important;
    }
  }
  button {
    display: inline-block;
    width: 70px;
    height: 35px;
    border: none;
    border-radius: 5px;
    line-height: 35px;
    margin-top: 10px;
    color: #fff;
    background-color: #f33;
    box-shadow: 0 5px 16px -3px #f33;
    float: right;
    margin-right: 10px;
  }
}
.tuijian {
  padding-left: 5%;
  color: #eb2a25;
  font-size: 14px;
  line-height: 42px;
  display: inline-block;
  width: 100%;
  border: 1px solid #f2f2f2;
  border-width: 4px 0;
}
.products {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.product {
  width: 45%;
  margin-top: 10px;
  .pic img {
    width: 100%;
    height: 170px;
  }
  .pro {
    width: 100%;
    height: 50px;
    .pro-top {
      width: 100%;
      p {
        display: inline-block;
        color: #eb2a25;
        margin-right: 5px;
      }
      .icon {
        color: #eb2a25 !important;
      }
    }
    .pro-bottom {
      width: 100%;
      display: block;
      font-size: 14px;
      display: inline-block;
      color: #4a4a4a;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
