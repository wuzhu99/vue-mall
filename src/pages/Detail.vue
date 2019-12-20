<template>
  <div class="detail">
    <div class="header">
      <span @click="$router.back()" class="icon">&#xe69e;</span>
      商品详情
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img :src='data.coverPath' alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="content">
      <h1 class="title">{{data.sub1}}</h1>
      <p>{{data.name}}</p>
      <p class="goods">{{data.catalog}}</p>
      <div class="price">
        <i>￥</i><span>{{data.saleprice}}</span>
      </div>
    </div>
    <div class="guarantee_g">
      <p>
        <span><i class="icon">&#xe63a;</i>七天无忧退货</span>
        <span><i class="icon">&#xe63a;</i>全平台包邮</span>
        <span><i class="icon">&#xe63a;</i>顺丰包邮</span>
        <span><i class="icon">&#xe63a;</i>超时包赔</span>
      </p>
    </div>
    <!-- <h4 class="tuijian">图书简介</h4> -->
    <div class="Other">
      <p class="sub2">出版社：<span class="sub1">{{(data.manufacturer)}}</span></p>
      <p class="sub2">作者：<span class="sub1">{{(data.authorName)}}</span></p>
    </div>
    <div class="toCart">
      <span
        class="gocart"
        @click="popupVisible4 = true"
      >
        加入购物车
      </span>
      <span
        @click="goDetailShop(data)"
        class="goshop"
      >
        <router-link tag="span" to ='/Settlement'>
          立即购买
        </router-link>
      </span>
    </div>
    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
      <div class="proWrap">
        <div style="width:100%; height:150px;">
          <img
            class="poImg"
            :src="data.coverPath"
            :alt="data.title"
          >
          <div class="info">
            <p class="goods">{{data.name}}</p>
            <p><del>￥{{(data.saleprice+Math.random()*100).toFixed(2)}}</del></p>
            <p>单价：￥<span>{{data.saleprice}}</span></p>
          </div>
        </div>
        <input
          type="button"
          value="加入购物车"
          class="btn"
          @click="handelToCart"
          @touchstart="toCart(data)"
        >
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast, Swipe, SwipeItem, Popup } from 'mint-ui'
import 'mint-ui/lib/style.css'
import {
  mapMutations,
  mapState
} from 'vuex'
Vue.component(Swipe.name, Swipe)
Vue.component(Toast.name, Toast)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Popup.name, Popup)

export default {
  name: 'Detail',
  data () {
    return {
      coloractive: 0,
      sizeactive: 0,
      product: {id: 0},
      popupVisible4: false
    }
  },
  methods: {
    colortoggle (index) {
      this.coloractive = index
    },
    sizetoggle (index) {
      this.sizeactive = index
    },
    handelToCart () {
      this.popupVisible4 = false
      Toast({
        message: '加入购物车成功',
        duration: 500,
        position: top
      })
    },
    ...mapMutations(['toCart', 'dataAddCount', 'dataReduceCount', 'goDetailShop'])
  },
  computed: {
    ...mapState(['data'])
  }
}
</script>

<style lang=scss scoped>
.detail{
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.header{
  width: 100%;
  height: 45px;
  background: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 45px;
  color: #111111;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  .icon{
    display: block;
    position: absolute;
    color: #f73f3f;
    font-size: 20px;
    padding: 0 15px;
  }
}
.mint-swipe{
  width: 100%;
  height: 360px;
  overflow: hidden;
  img{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    display: block;
  }
}
.content{
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;
  .title{
    font-size: 16px;
    line-height: 30px;
    border-top: 1px solid #dedede;
  }
  p{
    color: #6F6F6F;
  }
  .price{
    color: #f33;
    font-size: 20px;
    line-height: 40px;
    del{
      display: inline-block;
      width: 100px;
      font-size: 12px;
      color: gray;
    }
  }
}
.guarantee_g{
  font-size: 12px;
  line-height: 32px;
  background: #fafafa;
  p{
    display: flex;
    color: #333333;
    justify-content: space-around;
    span{
      display: inline-block;
      i{
        margin-right: 6px;
        font-family: 'iconfont';
      }
    }
  }
}
.tuijian{
  text-align: center;
  color: #666;
  font-size: 14px;
  line-height: 42px;
  display: inline-block;
  width: 100%;
  border: 1px solid #eeeeee;
  border-width: 1px 0;
}
.Other{
  width: 100%;
  padding: 2%;
  padding-bottom: 65px;
  .sub2{
    font-size: 16px;
    line-height: 30px;
    font-size: 12px;
    .sub1{
      color: #1d66b2;
      line-height: 20px;
      font-size: 12px;
    }
  }
}
.toCart{
  width: 100%;
  height: 52px;
  background: #000;
  position: fixed;
  bottom: 0;
  .goshop{
    float: right;
    display: block;
    text-align: center;
    line-height: 50px;
    width: 60%;
    height: 100%;
    background-color: #f41e33;
    color: #fff;
  }
  .gocart{
    float: left;
    display: block;
    text-align: center;
    line-height: 50px;
    width: 40%;
    height: 100%;
    background-color: #333333;
    color: #fff;
  }
}
.goods{
  line-height: 30px;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mint-popup-4{
  width: 100%;
  height: 240px;
  .proWrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .poImg{
      display: block;
      float: left;
      width: 36%;
      height: 120px;
    }
    .info{
      width: 60%;
      height: 120px;
      float: left;
      margin-left: 2%;
      .goods{
        border: none;
        color: gray;
        font-size: 12px;
      }
      .goodscon{
        padding-left: 10px;
        padding-left: 25px;
      }
      p{
        color: #f33;
        del{
          display: inline-block;
          font-size: 12px;
          color: gray;
        }
      }
    }
    /* .item-color{
      display: block;
      width: 100%;
      height: 35px;
      font-size: 12px;
      span{
        display: inline-block;
        text-align: center;
        line-height: 20px;
        border-radius: 5px;
        padding: 2px;
        width: 50px;
        height: 20px;
        margin: 0 5px;
        border: 1px solid #dedede;
      }
      .active{
        border: 1px solid #333333;
      }
    } */
  }
  .btn{
    width: 94%;
    margin: 0 3%;
    border-radius: 10px;
    border: none;
    background: #f41e33;
    box-shadow: 0 5px 16px -3px #f41e33;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
    color: #fff;
  }
}
/* .conputed{
  width: 100%;
  display: inline-block;
  width: 79px;
  border: 1px solid #dedede;
  height: 25px;
  margin-top: 5px;
  span{
    display: inline-block;
    width: 22px;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  .count{
    border: 1px solid #dedede;
    border-width: 0 1px;
  }
} */
</style>
