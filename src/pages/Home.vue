<template>
  <div class="home">
    <div class="app-header">
      <Search></Search>
    </div>
    <Carousel></Carousel>
    <ListIcon></ListIcon>
    <h4 class="tuijian">为你推荐</h4>
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
import Search from 'components/Search'
import Carousel from 'components/Carousel'
import ListIcon from 'components/listicon'
import {
  mapMutations
} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      listHome: '',
      currentPage: '1',
      data: '',
      list: [],
      loading: false
    }
  },
  components: {
    Search,
    Carousel,
    ListIcon
  },
  methods: {
    ...mapMutations(['toDetail']),
    ...mapMutations(['toProducts'])
  },
  created () {
    this.$http.get(process.env.API_HOST + `/search?&page=${this.currentPage}&format=json`)
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

<style lang='scss' scoped>
.home {
  height: 100%;
}
.tuijian {
  color: #eb2a25;
  padding: 0 24px;
  font-size: 14px;
  line-height: 42px;
  display: inline-block;
  width: 100%;
  border: 1px solid #eeeeee;
  border-width: 2px 0;
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
