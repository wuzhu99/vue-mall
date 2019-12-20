<template>
  <div class="Inquire">
    <div class="search">
      <span @click="$router.back()" class="icon">&#xe69e;</span>
      <i class="iconfont">&#xe609;</i>
      <input
        class="search-content"
        type="text"
        v-model="sug"
        autofocus="autofocus"
        @focus="handlShow()"
        @keyup.enter="handlSearch"
      />
      <input class="btn" type="button" value="搜索" @click="handlSearch" />
    </div>
    <!-- 历史搜索 -->
    <div v-if="Inquirelist.length === 0" class="record">
      <h1 class="record-top">
        历史记录
        <i class="icon" @click="handlClear()">&#xe7f4;</i>
      </h1>
      <span
        class="record-item"
        v-for="(item, $index) of recordList"
        @click="handlClickSearch(item)"
        :key="$index"
      >{{item}}</span>
    </div>
    <!-- 搜索结果 -->
    <div v-else class="content">
      <div class="list-item" :key="item.price" v-for="item of Inquirelist" @click="toDetail(item)">
        <router-link tag="div" :to="'/detail/'+item.id">
          <img :src="item.coverPath" alt />
          <div class="item-info">
            <h1 class="title">{{item.name}}</h1>
            <div class="desc">
              出版社：
              <span class="desc1">{{item.manufacturer}}</span>
            </div>
            <div class="desc">
              作者：
              <span class="desc1">{{item.authorName}}</span>
            </div>
            <p class="proInfo">
              <span class="price">
                <del>￥{{(item.saleprice+Math.random()*100).toFixed(2)}}</del>
                ￥{{item.saleprice}}
              </span>
              <span class="sales">月销量：{{(Math.random()*100).toFixed(0)}}</span>
            </p>
          </div>
        </router-link>
      </div>
      <p class="list-bottom">已经到底了</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { mapMutations } from 'vuex'
// import axios from 'axios'
Vue.component(Toast.name, Toast)
export default {
  name: 'Inquire',
  data () {
    return {
      sug: '',
      recordList: [],
      Inquirelist: [],
      currentPage: 1
    }
  },
  components: {
  },
  methods: {
    productListHandle () {
      this.$http.get(process.env.API_HOST + `/search?&keyword=${this.sug}&page=${this.currentPage}&format=json`)
        .then(resp => {
          if (resp.status === 200 && resp.statusText === 'OK') {
            this.data = resp.data.jsondata.data.searchResult.commodities
            this.data.map(item => {
              if (item.coverPath.charAt(0) === '/') {
                item.coverPath = 'http:' + item.coverPath
              }
            })
            this.currentPage = this.currentPage++
          }
        })
    },
    handlSearch () {
      if (this.sug !== '') {
        if (!(this.recordList.some(data => data === this.sug)) || this.recordList.length === 0) {
          this.recordList.push(this.sug)
        }
        this.$http.get(process.env.API_HOST + `/search?&keyword=${this.sug}&page=${this.currentPage}&format=json`)
          .then(resp => {
            if (resp.status === 200 && resp.statusText === 'OK') {
              this.Inquirelist = resp.data.jsondata.data.searchResult.commodities
              this.Inquirelist.map(item => {
                if (item.coverPath.charAt(0) === '/') {
                  item.coverPath = 'http:' + item.coverPath
                }
              })
              this.currentPage = this.currentPage++
            }
          })
        window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
      } else {
        Toast({
          message: '找不到哦 重新搜搜吧',
          duration: 1000
        })
      }
    },
    // 点击
    handlClickSearch (sug) {
      this.currentPage = 1
      this.$http.get(process.env.API_HOST + `/search?&keyword=${sug}&page=${this.currentPage}&format=json`)
        .then(resp => {
          if (resp.status === 200 && resp.statusText === 'OK') {
            this.Inquirelist = resp.data.jsondata.data.searchResult.commodities
            this.Inquirelist.map(item => {
              if (item.coverPath.charAt(0) === '/') {
                item.coverPath = 'http:' + item.coverPath
              }
            })
            this.currentPage = this.currentPage++
          }
        })
    },
    handlClear () {
      this.recordList = []
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
    },
    handlShow () {
      this.Inquirelist = []
    },
    ...mapMutations(['toDetail'])
  },
  created () {
    this.Inquirelist = []
    this.recordList = JSON.parse(window.localStorage.getItem('recordList')) || []
  }
}
</script>

<style lang=scss scoped>
.Inquire {
  width: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
  .search {
    width: 100%;
    height: 48px;
    background: #fff;
    position: fixed;
    overflow: hidden;
    padding-bottom: 5px;
    border-bottom: 2px solid #f2f2f2;
    .icon {
      line-height: 48px;
      padding: 0 5px;
      font-size: 20px;
      color: #f73f3f;
    }
    .search-content {
      margin-top: 48px;
      box-sizing: border-box;
      width: 70%;
      height: 40px;
      margin: 7px auto;
      border-radius: 4px;
      background-color: #f6f6f6;
      border: none;
      color: gray;
      padding-left: 12%;
    }
    .iconfont {
      display: block;
      position: absolute;
      font-size: 20px;
      left: 46px;
      top: 15px;
      font-family: "iconfont";
      color: #f73f3f;
    }
    .btn {
      color: #fff;
      background: #f73f3f;
      border: none;
      height: 40px;
      border-radius: 4px;
      width: 15%;
    }
  }
  .record {
    margin-top: 48px;
    width: 100%;
    background: #ffffff;
    width: 96%;
    padding: 0 2%;
    color: #333333;
    font-size: 12px;
    .record-top {
      line-height: 30px;
      font-size: 13px;
      padding: 0 5px;
      color: #333;
      .icon {
        float: right;
        color: #999999;
        display: inline-block;
      }
    }
    .record-item {
      margin: 5px;
      display: inline-block;
      border-radius: 5px;
      padding: 0 5px;
      border: 1px solid #e0e0e0;
    }
  }
  .content {
    width: 100%;
    overflow: hidden;
    margin-top: 55px;
    .list-item {
      width: 100%;
      height: 120px;
      background: #fff;
      margin-bottom: 5px;
      border-bottom: 1px solid #dedede;
      img {
        width: 100px;
        height: 100px;
        margin: 10px;
        display: block;
        float: left;
        border: none;
      }
      .item-info {
        width: calc(100% - 130px);
        height: 100px;
        background: #fff;
        float: left;
        margin: 10px 0;
        .title {
          font-size: 14px;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .desc {
          line-height: 20px;
          font-size: 11px;
          .desc1 {
            color: #1d66b2;
          }
        }
        .proInfo {
          display: flex;
          justify-content: space-between;
        }
        .price {
          display: inline-block;
          font-size: 14px;
          color: #f33;
        }
        del {
          display: inline-block;
          font-size: 12px;
          color: gray;
        }
        .sales {
          display: inline-block;
          line-height: 20px;
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
}
</style>
