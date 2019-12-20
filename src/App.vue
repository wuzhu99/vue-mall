<template>
  <div id="app">
    <div class="app-main">
      <router-view></router-view>
    </div>
    <div class="tabbar" v-show="isShowTabbar">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from 'components/Tabbar'
import '@/assets/reset.scss'
export default {
  name: 'App',
  data () {
    return {
      isShowTabbar: true
    }
  },
  components: {
    Tabbar
  },
  watch: {
    '$route' (data) {
      if (data.name === 'detail' ||
          data.name === 'ProductList' ||
          data.name === 'Inquire' ||
          data.name === 'login' ||
          data.name === 'Setting' ||
          data.name === 'Settlement' ||
          data.name === 'Address' ||
          data.name === 'Registered'
      ) {
        this.isShowTabbar = false
      } else {
        this.isShowTabbar = true
      }
    }
  }
}
</script>

<style>
.tabbar{
    z-index: 1;
}
</style>
