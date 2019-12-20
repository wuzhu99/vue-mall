<template>
  <router-link
    tag="div"
    to="/Inquire"
    class="ss"
  >
    <button class="ss-content">搜索</button>
  </router-link>
</template>

<script>
export default {
  name: 'Search'
}
</script>
<style lang="scss" scoped>
.ss{
  width: 100%;
  height: 48px;
  background: #f73f3f;
  overflow: hidden;
  position: relative;
  .ss-content{
    display: block;
    box-sizing: border-box;
    width: 90%;
    height: 32px;
    display: block;
    margin: 7px auto;
    border-radius: 4px;
    background-color: #ffffff;
    border: none;
    color: #999999;
    padding: 0 5%;
    text-align: left;
  }
}
</style>
