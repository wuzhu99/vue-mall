<template>
  <div class="list">
    <div class="header">
      <span @click="$router.back()" class="icon">&#xe69e;</span>
      图书列表
    </div>
    <div class="content">
      <div
        class="list-item"
        :key= item.price
        v-for="item of productsData"
        @click="toDetail(item)"
      >
        <router-link
          tag="div"
          :to = "'/detail/'+item.id"
        >
          <img :src=item.coverPath alt="">
          <div class="item-info">
            <h1 class="title">{{item.name}}</h1>
            <div class="desc">出版社：<span class="desc1">{{item.manufacturer}}</span></div>
            <div class="desc">作者：<span class="desc1">{{item.authorName}}</span></div>
            <p class="proInfo">
              <span class="price"><del>￥{{(item.saleprice+Math.random()*100).toFixed(2)}}</del>￥{{item.saleprice}}</span>
              <span class="sales">月销量：{{(Math.random()*100).toFixed(0)}}</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import {
  mapMutations,
  mapState
} from 'vuex'
Vue.component(Toast.name, Toast)
export default {
  name: 'ProductList',
  data () {
    return {
      prodata: '',
      currentPage: 1
    }
  },
  methods: {
    ...mapMutations(['toDetail'])
  },
  computed: {
    ...mapState(['productsData'])
  }
}
</script>

<style lang="scss" scoped>
.list{
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  overflow: auto;
}
.header{
      width: 100%;
    height: 45px;
    background: #f73f3f;
    font-size: 16px;
    color: #f1f1f1;
    text-align: center;
    line-height: 45px;
    position: fixed;
  .icon{
    display: block;
    position: absolute;
    color: #f1f1f1;
    font-size: 20px;
    padding: 0 15px;
  }
}
.content{
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
  .list-item{
    width: 100%;
    height: 120px;
    background: #fff;
    margin-bottom: 5px;
    border-bottom: 1px solid #dedede;
    img{
      width: 100px;
      height: 100px;
      margin: 10px;
      display: block;
      float: left;
      border: none;
    }
    .item-info{
      width: calc(100% - 130px);
      height: 100px;
      background: #fff;
      float: left;
      margin: 10px 0;
      .title{
        font-size: 14px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .desc{
        line-height: 20px;
        font-size: 11px;
        .desc1{
          color:#1d66b2;
        }
      }
      .proInfo{
        display: flex;
        justify-content: space-between;
      }
      .price{
        display: inline-block;
        font-size: 14px;
        color: #f33;
      }
      del{
        display: inline-block;
        font-size: 12px;
        color: gray;
      }
      .sales{
        display: inline-block;
        line-height: 20px;
        font-size: 10px;
        color: #999;
      }
    }
  }
}
</style>
