<template>
  <div class="login">
    <router-link tag="span" to="/" class="icon">&#xe69e;</router-link>
    <form>
      <p class="phone">
        <span>手机号:</span>
        <input
          type="text"
          class="login-phone"
          autocomplete="email"
          @change="handlUserName"
          v-model="ssuser.phone"
          placeholder="请输入手机号"
        />
        <span v-show="ssuser.phone !== ''" v-if="handlPhoneName" class="icon" style="color:#f33;"></span>
        <!-- <span
          v-show="ssuser.phone !== ''"
          v-else
          class="icon yzm"
          @click="handelSendYzm"
          style="color:#5ee177;"
        >获取验证码</span>-->
      </p>
      <!-- <p>
        <span>验证码:</span>
        <input
          type="text"
          class="login-name"
          autocomplete="email"
          v-model="yzmValue"
          placeholder="请输入验证码"
        />
      </p>-->
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
      <input type="button" value="登     录" class="btn" @click="handlReg" />
    </form>
    <p class="goLogin">
      <router-link class="glogin" to="/Login">已有账号？立即登录</router-link>
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
  name: 'Registered',
  data () {
    return {
      ssuser: {
        username: '',
        password: '',
        phone: ''
      },
      yzmValue: '',
      yzm: ''
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
    },
    // 输入手机号判断
    handlPhoneName () {
      var pPattern = /^1[0-9]{10}$/
      return (!(pPattern.test(this.ssuser.phone)))
    }
  },
  methods: {
    ...mapMutations(['regSuccess']),
    // 验证码
    // handelSendYzm () {
    //   this.yzm = (Math.random() * 1000000).toFixed(0)
    //   this.$http.get(process.env.API_REG_HOST + `/sms/send?mobile=${this.ssuser.phone}&tpl_id=144783&tpl_value=%23code%23%3d${this.yzm}`)
    //     .then(resp => {
    //       if (resp.data.reason === '操作成功') {
    //         Toast({
    //           message: '发送成功',
    //           duration: 1000
    //         })
    //       } else {
    //         Toast({
    //           message: '网络不好，重新试试吧',
    //           duration: 1000
    //         })
    //       }
    //     })
    // },
    // 登录
    handlReg () {
      const {
        username,
        password,
        phone
      } = this.ssuser
      if (
        username !== '' &&
        password !== ''
      ) {
        // if (this.yzmValue === this.yzm) {
        if (
          this.handlUserName === false &&
          this.handlPassWord === false
        ) {
          this.$http.post('http://rap2api.taobao.org/app/mock/117730/api/login', { username, password })
            .then(resp => {
              if (resp.data.res_code === '200') {
                this.regSuccess({
                  tokgen: resp.data.res_body.data.tokgen,
                  phone: phone,
                  password: password,
                  username: username
                })
              }
            })
        } else {
          Toast({
            message: '密码或账户错误，请重新输入',
            duration: 1000
          })
        }
        // } else {
        //   Toast({
        //     message: '验证码错误',
        //     duration: 1000
        //   })
        // }
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
  margin: 10px 0;
  padding: 0 30px;
}
.phone {
  .login-phone {
    width: 55%;
  }
  .icon {
    width: 20%;
    font-size: 12px;
    line-height: 60px;
  }
}
.yzm {
  cursor: pointer;
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
.goLogin {
  text-align: center;
  font-size: 12px;
  padding-left: 0;
  border-bottom: none;
  .glogin {
    color: #f41e33;
  }
}
</style>
