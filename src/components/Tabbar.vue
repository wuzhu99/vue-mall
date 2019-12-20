<template>
  <ul class="tabbar">
    <router-link
      class="tabbar-link"
      tag="li"
      v-for="link in linkData"
      :key="link.name"
      :to="{name: link.name}"
    >
    <mt-badge
      v-if='link.title === "购物车"'
      v-show='TotalCount !== 0'
      size="small"
      type="error"
      >{{TotalCount}}</mt-badge>
    <span class="iconfont" v-html="link.icon"></span>
    <span class="title">{{link.title}}</span>
    </router-link>
  </ul>
</template>

<script>
import Vue from 'vue'
import routes from '@/router/routes'
import { Badge } from 'mint-ui'
import {
  mapGetters
} from 'vuex'
Vue.component(Badge.name, Badge)

export default {
  name: 'Tabbar',
  data () {
    return {
      linkData: routes.filter(route => route.isNav === true)
    }
  },
  computed: {
    ...mapGetters(['TotalCount'])
  }
}
</script>

<style lang="scss" scoped>
.tabbar{
  display: flex;
  height: 52px;
  width: 100%;
  background: #f8f8f8;
  border-top: 1px solid #e5e5e5;
  &-link{
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconfont{
      font-size: 21px;
      line-height: 26px;
      font-family: 'iconfont';
      color: #6f6f6f;
    }
    .title{
      font-size: 12px;
      color: #6f6f6f;
      line-height: 15px;
    }
  }
  .router-link-exact-active, .router-link-active{
    .iconfont, .title{
      color: #eb2929;
    }
  }
}
.tabbar-link{
  position: relative;
  .mint-badge{
    position: absolute;
    right: 20px;
    top: -3px;
  }
}
</style>
