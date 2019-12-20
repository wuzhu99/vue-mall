<template>
  <div class="Setting">
    <div class="header">
      <span @click="$router.back()" class="icon">&#xe69e;</span>
      个人设置
    </div>
    <div class="m-activity">
      <div class="m-activity-item">
        <div class="m-activity-item-r">
          <span>名字：</span>
          <span>{{user.username}}</span>
        </div>
      </div>
      <div class="m-activity-item">
        <div class="m-activity-item-r">
          <span>手机号：</span>
          <span>{{user.phone}}</span>
        </div>
      </div>
      <div class="m-activity-item">
        <router-link tag="p" to="/Address">
          <div class="m-activity-item-r">
            <span>收货地址：{{user.Address}}</span>
            <span v-show="user.Address==null">完善收货地址</span>
          </div>
        </router-link>
      </div>
      <div class="m-activity-item" @click="handleSetPass">
        <div class="m-activity-item-r">
          <span>修改密码</span>
          <span></span>
        </div>
      </div>
      <input type="button" value="退出登录" class="btn" @click="handldrop" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
Vue.component(Toast.name, Toast)
export default {
  name: 'Setting',
  data () {
    return {
      data: '',
      prodata: '',
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 修改密码
    handleSetPass () {
      var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
      MessageBox.prompt(' ', {
        message: '请输入当前密码',
        title: '',
        confirmButtonText: '确认'
      }).then(({ value, action }) => {
        if (this.user.password === value) {
          MessageBox.prompt(' ', {
            message: '请输入新的密码',
            title: '',
            confirmButtonText: '确认'
          }).then(({ value, action }) => {
            if (pPattern.test(value)) {
              this.$store.commit('setPass', value)
              Toast({
                message: '修改成功',
                duration: 1000
              })
            } else {
              Toast({
                message: '密码格式错误',
                duration: 1000
              })
            }
          }).catch(err => {
            err = null
          })
        } else {
          Toast({
            message: '密码错误',
            duration: 1000
          })
        }
      }).catch(err => {
        err = null
      })
    },
    // 输入密码判断
    handlPassWord (value) {
      var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
      return (!(pPattern.test(value)))
    },
    // 退出登录
    handldrop () {
      this.$store.commit('dropSuccess')
      this.$router.push('/Home')
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
.m {
  &-activity {
    color: #333333;
    border-width: 1px 0;
    margin-top: 45px;
    &-item {
      cursor: pointer;
      height: 42px;
      padding-left: 5%;
      border-bottom: 1px solid #e6e6e6;
      &-r {
        height: 100%;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 12px;
          line-height: 42px;
        }
        span:nth-child(2) {
          color: #999999;
          padding-right: 20px;
        }
      }
    }
  }
}
.btn {
  width: 94%;
  margin: 30px 3%;
  border-radius: 10px;
  border: none;
  background-color: #f41e33;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  color: #f1f1f1;
}
</style>
