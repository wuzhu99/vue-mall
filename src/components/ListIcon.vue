<template>
  <div>
    <div class="listicon">
    <dl
    v-for='list of listnav'
    :key='list.id'
    @click="toProductsList(list.title)"
    >
      <router-link
        tag="div"
        to ='/ProductList'
      >
        <dt><i class="icon" v-html="list.icon"></i></dt>
        <dd>{{list.title}}</dd>
      </router-link>
    </dl>
  </div>
  </div>
</template>

<script>
import {
  mapMutations
} from 'vuex'
export default {
  name: 'ListIcon',
  data () {
    return {
      data: '',
      listnav: [{
        icon: '&#xe61b;',
        id: Math.random(),
        title: '小说'
      }, {
        icon: '&#xe610;',
        id: Math.random(),
        title: '文学'
      }, {
        icon: '&#xe65e;',
        id: Math.random(),
        title: '经济'
      }, {
        icon: '&#xe602;',
        id: Math.random(),
        title: '管理'
      }, {
        icon: '&#xe618;',
        id: Math.random(),
        title: '少儿'
      }, {
        icon: '&#xe619;',
        id: Math.random(),
        title: '计算机'
      }, {
        icon: '&#xe617;',
        id: Math.random(),
        title: '军事'
      }, {
        icon: '&#xe62e;',
        id: Math.random(),
        title: '娱乐'
      }, {
        icon: '&#xe611;',
        id: Math.random(),
        title: '哲学'
      }, {
        icon: '&#xe601;',
        id: Math.random(),
        title: '艺术'
      }]
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.listicon{
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  dl{
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    color: #666;
    dd{
    font-size: 10px;
    line-height: 24px;
    }
  }
  .icon{
    font-size: 24px;
    font-family: 'iconfont';
    color: #f73f3f;
  }
}
</style>
