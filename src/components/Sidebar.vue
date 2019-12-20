<template>
  <div class="sidebar">
    <ul class="sidebra-wrap">
      <li
        class="sidebar-item"
        :key="item.index"
        v-for="(item,$index) in listdata"
        @click="toggle($index,item)"
        :class="{active:$index==active}"
      >
        <div class="word">{{item}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import listdata from '@/assets/Navlists.js'
export default {
  name: 'Sidebar',
  data () {
    return {
      active: 0,
      listdata: listdata,
      listDetail: null
    }
  },
  methods: {
    toggle (index, item) {
      this.active = index
      this.$http.get('http://rap2api.taobao.org/app/mock/117730/api/categorylist')
        .then(resp => {
          this.listDetail = resp
        })
    },
    listDetaildata () {
      return this.listDetail
    }
  },
  created () {
    this.$http.get('http://rap2api.taobao.org/app/mock/117730/api/categorylist')
      .then(resp => {
        this.listDetail = resp.data.res_data
      })
  }
}
</script>

<style lang='scss' scoped>
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
  .sidebar-item {
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    color: #333;
  }
  .active {
    color: #7f4395;
    font-size: 16px;
    border-left: 2px solid #7f4395;
    .sidebra-icon {
      color: #0093d5;
    }
  }
}
</style>
