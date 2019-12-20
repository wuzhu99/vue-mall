<template>
  <div class="Setting">
    <div class="header">
      <span @click="$router.back()" class="icon">&#xe69e;</span>
      地址管理
    </div>
    <input type="button" value="添加地址" class="addAddress" @click="handleAddress" />
    <div class="m-activity">
      <div class="m-activity-item" :key="$index" v-for="(item, $index) of user.address">
        <div class="m-activity-item-r">
          <span @click="handleTop($index)">{{item}}</span>
        </div>
        <span class="icon xiugai" @click="handleSetAddress($index, item)">&#xe765;</span>
        <span class="icon xiugai" @click="handledelAddress($index)">&#xe604;</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
Vue.component(Toast.name, Toast)
export default {
  name: 'Address',
  data () {
    return {
      data: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleTop (index) {
      MessageBox.confirm(' ', {
        message: '设为默认地址',
        title: '',
        confirmButtonText: '确认'
      }).then(({ action }) => {
        this.$store.commit('setTopAddress', index)
      }).catch(err => {
        err = null
      })
    },
    handleAddress () {
      MessageBox.prompt(' ', {
        message: '添加地址',
        title: '',
        confirmButtonText: '添加'
      }).then(({ value, action }) => {
        this.$store.commit('Address', value)
      }).catch(err => {
        err = null
      })
    },
    handleSetAddress (id, value) {
      MessageBox.prompt(' ', {
        message: '修改地址',
        title: '',
        inputValue: value,
        confirmButtonText: '确认修改'
      }).then(({ value, action }) => {
        this.$store.commit('setAddress', { id, value })
      }).catch(err => {
        err = null
      })
    },
    handledelAddress (id) {
      MessageBox.confirm('', {
        message: '此操作不可恢复 确认删除？',
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.$store.commit('delAddress', id)
        }
      }).catch(err => {
        err = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Setting {
  overflow: hidden;
}
.header {
  width: 100%;
  height: 45px;
  background: #f73f3f;
  font-size: 16px;
  color: #f1f1f1;
  text-align: center;
  line-height: 45px;
  position: fixed;
  .icon {
    display: block;
    position: absolute;
    color: #f1f1f1;
    font-size: 20px;
    padding: 0 15px;
  }
}
.addAddress {
  margin: 0 3%;
  margin-top: 65px;
  width: 94%;
  border-radius: 10px;
  border: none;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}
.m {
  &-activity {
    color: #333333;
    border-width: 1px 0;
    &-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      line-height: 100%;
      font-size: 12px;
      color: #999999;
      .xiugai {
        cursor: pointer;
        display: block;
        box-sizing: border-box;
        width: 10%;
        padding-top: 5%;
      }
      &-r {
        width: 80%;
        height: 100%;
        padding: 3% 5%;
        span {
          line-height: 20px;
        }
      }
    }
  }
}
</style>
