<template>
  <div class="s">
    <mt-swipe :auto="4000">
    <mt-swipe-item>
      <img src="http://static.winxuancdn.com/topic/subject/201903/wm/640-304.jpg?201903141658" alt="">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="http://static.winxuancdn.com/topic/subject/201902/19ck/640-304-1.jpg?201903141658" alt="">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="http://static.winxuancdn.com/topic/subject/201902/19ck/640-304-2.jpg?201903141658" alt="">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="http://static.winxuancdn.com/topic/subject/201902/lldq/640-304.jpg?201903141658" alt="">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="http://static.winxuancdn.com/topic/subject/201809/xhbs/640-304.jpg?201903141658" alt="">
    </mt-swipe-item>
  </mt-swipe>
    <div class="guarantee_g">
      <p>
        <span><i class="icon">&#xe63a;</i>正品保障</span>2
        <span><i class="icon">&#xe63a;</i>七天无忧退货</span>
        <span><i class="icon">&#xe63a;</i>全平台包邮</span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'Carousel'
}
</script>

<style scoped lang="scss">
.mint-swipe{
  width: 100%;
  height: 180px;
  overflow: hidden;
  img{
    width: 100%;
    height: 180px;
  }
  .mint-swipe-indicator{
    background: #f73f3f !important;
    opacity: 1 !important;
  }
  .is-active{
    background: #f73f3f;
  }
}
.guarantee_g{
  font-size: 12px;
  color: #f3f3f3;
  background: #f73f3f;
  line-height: 32px;
  p{
    display: flex;
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
</style>
