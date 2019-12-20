<template>
  <div class="cart">
    <div class="header">
      <router-link to="/">
        <span class="icon">&#xe608;</span>
      </router-link>购物车
    </div>
    <div class="content" v-if="cartList.length !== 0">
      <div
        class="content-item"
        :key="cartItem.id"
        v-for="cartItem of cartList"
        @touchstart="toDetail(cartItem)"
      >
        <div class="checkbox">
          <label class="raido-input">
            <input
              type="checkbox"
              :checked="cartItem.ISChecked"
              @change="handlItemChecked(cartItem.id)"
            />
            <span></span>
          </label>
        </div>
        <router-link :to="'/detail/'+cartItem.id">
          <img :src="cartItem.coverPath" alt />
        </router-link>
        <div class="content-info">
          <router-link @click="toDetail(cartItem)" :to="'/detail/'+cartItem.id">
            <h1 class="title">{{cartItem.name}}</h1>
          </router-link>
          <p>
            <span class="price">
              <i>单价：</i>
              ￥{{cartItem.saleprice}}
            </span>
          </p>
          <div class="conputed">
            <span class="dnc" @click="reduceCount(cartItem.id)">-</span>
            <span class="count">{{cartItem.count}}</span>
            <span class="inc" @click="addCount(cartItem.id)">+</span>
          </div>
          <span class="sum">
            <i>小计：￥</i>
            {{(cartItem.saleprice*cartItem.count).toFixed(2)}}
          </span>
        </div>
        <a href="javascript:void(0)" class="del" @click="delItem(cartItem.id)">删除</a>
      </div>
      <div class="total">
        <div class="allcheckbox">
          <label>
            <input
              class="allinput"
              type="checkbox"
              @change="handlAllChecked(AllChecked)"
              :checked="AllChecked"
            />全选
          </label>
        </div>
        <div class="btn">
          <span>合计：</span>
          <span class="total-sum">
            <i>￥</i>
            {{TotalPrice.toFixed(2)}}
          </span>
          <span class="goShop" @click="goCartShop">
            <router-link to="/Settlement">去结算</router-link>
          </span>
        </div>
      </div>
    </div>
    <!-- 当购物车为空时 -->
    <div class="cart-empty" v-else>
      <h1 class="icon">&#xe624;</h1>
      <p class="iconp1">购物车空空如也T.T</p>
      <p class="iconp2">小主快去挑选心仪的宝贝吧！</p>
      <router-link class="router-link-active" to="/Classify">去逛逛</router-link>
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
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      checkedList: [],
      List: [],
      data: ''
    }
  },
  methods: {
    ...mapMutations([
      'toDetail',
      'addCount',
      'reduceCount',
      'delItem',
      'handlItemChecked',
      'handlAllChecked',
      'goCartShop'
    ])
  },
  computed: {
    ...mapGetters([
      'itemTotalPrice',
      'TotalPrice',
      'AllChecked',
      'Checked'
    ]),
    ...mapState(['cartList'])
  },
  created () {
    let currentPage = 5
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
.cart {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
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
.content {
  margin-top: 45px;
  width: 100%;
  overflow: hidden;
  padding-bottom: 45px;
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
  .del {
    display: block;
    color: #f33;
    position: absolute;
    font-size: 14px;
    text-decoration: underline;
    top: 10%;
    right: 5%;
  }
  .checkbox {
    width: 26px;
    height: 100%;
    float: left;
    line-height: 100%;
  }
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
      display: inline-block;
      text-align: right;
      margin-left: 10px;
      color: #eb2929;
    }
  }
}
.raido-input {
  cursor: pointer;
  line-height: 100px;
}
.raido-input span {
  display: inline-block;
  height: 30px;
  position: relative;
}
.raido-input span::before {
  content: "";
  cursor: pointer;
  width: 16px;
  height: 16px;
  border: 1px solid #eb2929;
  border-radius: 50%;
  position: absolute;
  box-sizing: border-box;
  left: 5px;
  top: 5px;
}
.raido-input span::after {
  content: "";
  width: 11px;
  height: 11px;
  background: #eb2929;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: 7px;
  opacity: 0;
}
.raido-input input {
  display: none;
}
.raido-input input:checked ~ span::after {
  opacity: 1;
  transition: opacity 0.3s ease-in;
}
.total {
  position: absolute;
  bottom: 52px;
  width: 100%;
  height: 52px;
  background-color: #fff;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  .allcheckbox {
    width: 70px;
    height: 52px;
    float: left;
    line-height: 52px;
    .allinput {
      width: 20px;
    }
  }
  .btn {
    float: right;
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
    .goShop {
      display: inline-block;
      width: 70px;
      height: 35px;
      border: none;
      border-radius: 5px;
      line-height: 35px;
      margin-top: 10px;
      background-color: #f33;
      box-shadow: 0 5px 16px -3px #f33;
      float: right;
      margin-right: 10px;
      text-align: center;
      a {
        color: #fff;
      }
    }
  }
}
.cart-empty {
  margin-top: 45px;
  padding-top: 50px;
  text-align: center;
  .icon {
    font-size: 80px;
    color: #cccccc;
  }
  .iconp1 {
    font-size: 12px;
    text-align: center;
    color: #a1a1a1;
  }
  .iconp2 {
    text-align: center;
    color: #acacac;
    font-size: 12px;
  }
  .router-link-active {
    background: #f41e33;
    color: #fff;
    font-size: 12px;
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 5px;
    display: block;
    margin: 13px auto;
    line-height: 30px;
  }
}
.tuijian {
  background: #fff;
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
  background: #fff;
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
