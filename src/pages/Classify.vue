<template>
  <div class="Classify">
    <div class="Classify-top">
      <Search></Search>
      <div class="liubai"></div>
    </div>
    <div class="Classify-mian">
      <div class="sidebar">
        <ul class="sidebra-wrap">
          <li
            class="sidebar-item"
            :key="item.code"
            v-for="item in listdata"
            @click="toggle(item.code,item.href)"
            :class="{active:item.code==active}"
            v-show="item.sort"
          >
            <div class="word">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="Classify-content">
        <div class="content-top">
          <img
            src="http://static.winxuancdn.com/topic/subject/201902/19ck/640-90.jpg?201903141658"
            alt
          />
        </div>
        <ul class="content-list">
          <li
            v-for="item in this.listDetail"
            :key="item.code"
            v-show="item.sort"
            @click="toProductsList(item.name)"
          >
            <router-link tag="div" to="/ProductList">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Search from 'components/Search'
import ListIcon from 'components/listicon'
import { CellSwipe } from 'mint-ui'
import {
  mapMutations
} from 'vueX'
Vue.component(CellSwipe.name, CellSwipe)
export default {
  name: 'Mall',
  data () {
    return ({
      active: 1.1042,
      listdata: '',
      listDetail: '',
      data: ''
    })
  },
  components: {
    Search,
    ListIcon
  },
  methods: {
    ...mapMutations(['toProducts']),
    toProductsList (data) {
      this.$http.get(process.env.API_HOST + `/search?&keyword=${data}&page=1&format=json`)
        .then(resp => {
          if (resp.status === 200 && resp.statusText === 'OK') {
            this.data = resp.data.jsondata.data.searchResult.commodities
            this.data.map(item => {
              if (item.coverPath.charAt(0) === '/') {
                item.coverPath = 'http:' + item.coverPath
              }
            })
            this.$store.commit('toProducts', this.data)
          }
        })
    },
    toggle (id, href) {
      this.active = id
      this.$http.get(process.env.API_HOST + `/search${href}&format=json`)
        .then(resp => {
          this.listDetail = resp.data.jsondata.data.searchResult.facetResults.category
        })
    },
    juhe () {
      let currentPage = 1
      this.$http.get(process.env.API_HOST + `/search?&page=${currentPage}&format=json`)
        .then(resp => {
          if (resp.status === 200 && resp.statusText === 'OK') {
            this.listdata = resp.data.jsondata.facetlist
          }
        })
    }
  },
  created () {
    this.juhe()
    this.toggle(this.active, '?code=1.1042&keyWordSegNum=1&size=18&type=11001&noEBook=yes')
  }
}
</script>

<style lang='scss' scoped>
.liubai {
  width: 100%;
  height: 10px;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
}
.Classify {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .Classify-mian {
    flex: 1;
    height: 100%;
    .Classify-content {
      float: right;
      width: calc(100% - 82px);
      overflow-x: hidden;
    }
  }
}
.content-top {
  width: 100%;
  img {
    display: block;
    width: 94%;
    margin: 10px auto;
  }
}
.list-hd {
  margin: 26px 0;
  text-align: center;
  font-size: 12px;
  color: #999;
  position: relative;
}
.list-hd:before {
  content: "";
  position: absolute;
  height: 1px;
  top: 50%;
  margin-top: 0px;
  margin-left: -70px;
  width: 60px;
  background: #dedede;
}
.list-hd::after {
  content: "";
  position: absolute;
  height: 1px;
  top: 50%;
  margin-top: 0px;
  margin-right: -70px;
  left: 160px;
  width: 60px;
  background: #dedede;
}
.content-list {
  width: 100%;
  padding: 0 5px;
  display: flex;
  box-sizing: border-box;
  justify-content: start;
  flex-wrap: wrap;
  li {
    font-size: 12px;
    width: 44%;
    height: 35px;
    line-height: 30px;
    margin: 5px 3%;
    background-color: #f6f6f6;
    overflow: hidden;
    text-align: center;
  }
}
.sidebar {
  width: 81px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #eeeeee;
  float: left;
  overflow-x: hidden;
}
.sidebra-wrap {
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 52px;
  .sidebar-item {
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 0;
    color: #333;
  }
  .active {
    color: #f73f3f;
    font-size: 14px;
    border-left: 2px solid #f73f3f;
    .sidebra-icon {
      color: #0093d5;
    }
  }
}
</style>
