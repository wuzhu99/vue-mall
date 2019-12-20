<template>
  <div class="login">
    <router-link tag="span" to="/" class="icon">&#xe69e;</router-link>
    <form>
      <p>
        <span>用户名:</span>
        <input
          type="text"
          class="login-name"
          autocomplete="email"
          @change="handlUserName"
          v-model="ssuser.username"
          placeholder="请输入用户名"
        />
        <span
          v-show="ssuser.username !== ''"
          v-if="handlUserName"
          class="icon"
          style="color:#f33;"
        >&#xe603;</span>
        <span v-show="ssuser.username !== ''" v-else class="icon" style="color:#5ee177;">&#xe63a;</span>
      </p>
      <p>
        <span>密码:</span>
        <input
          type="password"
          class="pass"
          autocomplete="password"
          v-model="ssuser.password"
          @change="handlPassWord"
          placeholder="请输入密码"
        />
        <span
          v-show="ssuser.password !== ''"
          v-if="handlPassWord"
          class="icon"
          style="color:#f33;"
        >&#xe603;</span>
        <span v-show="ssuser.password !== ''" v-else class="icon" style="color:#5ee177;">&#xe63a;</span>
      </p>
      <input type="button" value="登     录" class="btn" @click="handlLogin" />
    </form>
    <p class="goRegistered">
      <router-link class="gRegistered" to="/Registered">没有账号？立即注册</router-link>
    </p>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import {
  mapMutations,
  mapState
} from 'vuex'
Vue.component(Toast.name, Toast)
export default {
  name: 'Login',
  data () {
    return {
      ssuser: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 输入用户名判断
    handlUserName () {
      var uPattern = /^[a-zA-Z0-9_-]{5,16}$/
      return (!(uPattern.test(this.ssuser.username)))
    },
    // 输入密码判断
    handlPassWord () {
      var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
      return (!(pPattern.test(this.ssuser.password)))
    }
  },
  methods: {
    ...mapMutations(['loginSuccess']),
    // 登录
    handlLogin () {
      const {
        username,
        password
      } = this.ssuser
      if (
        username !== '' &&
        password !== ''
      ) {
        if (
          this.handlUserName === false &&
          this.handlPassWord === false
        ) {
          if (
            this.user.username === username &&
            this.user.password === password
          ) {
            this.loginSuccess()
          } else {
            Toast({
              message: '用户名或账户错误',
              duration: 1000
            })
          }
        } else {
          Toast({
            message: '输入不合法，请重新输入',
            duration: 1000
          })
        }
      } else {
        Toast({
          message: '输入为空',
          duration: 1000
        })
      }
    }
  },
  watch: {
    user (val) {
      if (val.isLogin === true) {
        const { redirect = '/home' } = this.$route.params
        this.$router.push(redirect)
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    }
  }
}
</script>

<style lang=scss scoped>
.login {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  .icon {
    position: absolute;
    line-height: 65px;
    font-size: 20px;
    color: #f41e33;
  }
  img {
    width: 100%;
    display: block;
  }
}
form {
  background: #fdfdfd;
  overflow: hidden;
  padding-top: 40px;
  padding-bottom: 10px;
}
p {
  padding-left: 7%;
  display: block;
  font-size: 14px;
  border-bottom: 1px solid #eeeeee;
  span {
    display: inline-block;
    width: 50px;
  }
}
input {
  box-sizing: border-box;
  width: 70%;
  height: 40px;
  border: none;
  border-radius: 5px;
  margin: 10px 3%;
  padding: 0 30px;
}
.btn {
  border-radius: 10px;
  margin: 10px 10%;
  box-sizing: border-box;
  width: 80%;
  border: none;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  background-color: #f41e33;
  color: #fff;
}
.goRegistered {
  text-align: center;
  font-size: 12px;
  padding-left: 0;
  border-bottom: none;
  .gRegistered {
    color: #f41e33;
  }
}
</style>
