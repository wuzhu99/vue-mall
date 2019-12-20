<template>
  <div class="mine">
    <router-link
      tag="span"
      to="/"
      class="icon"
    >
      &#xe69e;
    </router-link>
    <div>
      <div class="nav">
        <div class="component-nav">
          <div class="navLeft">
            <div class="navLefticon">
            </div>
            <div class="navLefttxt">
              <span>{{user.username}}</span>
            </div>
          </div>
          <div class="navRight"><span>普通会员</span></div>
        </div >
      </div>
      <div class="spacing"></div>
      <div class="all-order">
        <div class="all-order-top">
          <span>全部订单</span>
          <span>查看详情</span>
        </div>
        <div class="all-order-payInfo">
          <div class="all-order-payInfo-item">
            <span class="icon-mine">&#xe616;</span>
            <span class="icon-txt">待支付</span>
          </div>
          <div class="all-order-payInfo-item">
            <span class="icon-mine">&#xe627;</span>
            <span class="icon-txt">待发货</span>
          </div>
          <div class="all-order-payInfo-item">
            <span class="icon-mine">&#xe61a;</span>
            <span class="icon-txt">待收货</span>
          </div>
          <div class="all-order-payInfo-item">
            <span class="icon-mine">&#xe64a;</span>
            <span class="icon-txt">评价管理</span>
          </div>
          <div class="all-order-payInfo-item">
            <span class="icon-mine">&#xe634;</span>
            <span class="icon-txt">退款/售后</span>
          </div>
        </div>
      </div>
      <div class="spacing"></div>
      <div class="all-order-payInfo">
        <div class="all-order-payInfo-item">
          <span class="icon-mine">0</span>
          <span class="icon-txt">我的收藏</span>
        </div>
        <div class="all-order-payInfo-item">
          <span class="icon-mine">20</span>
          <span class="icon-txt">我的积分</span>
        </div>
        <div class="all-order-payInfo-item">
          <span class="icon-mine">0</span>
          <span class="icon-txt">优惠券</span>
        </div>
        <div class="all-order-payInfo-item">
          <span class="icon-mine">0<span class="debug-txt">张</span></span>
          <span class="icon-txt">礼品卡</span>
        </div>
      </div>
      <div class="spacing"></div>
        <div class="m-activity">
          <div class="m-activity-item">
            <router-link tag="p" to ='/Setting'>
            <div class="m-activity-item-l">
              <span class="icon-mine green1">&#xe607;</span>
            </div>
            <div class="m-activity-item-r">
              <span>个人设置</span>
              <span></span>
            </div>
            </router-link>
          </div>
          <div class="m-activity-item">
            <div class="m-activity-item-l">
              <span class="icon-mine orange">&#xe700;</span>
            </div>
            <div class="m-activity-item-r">
              <span>会员福利社</span>
              <span>签到送积分</span>
            </div>
          </div>
          <div class="m-activity-item">
            <div class="m-activity-item-l">
              <span class="icon-mine purpul">&#xe606;</span>
            </div>
            <div class="m-activity-item-r">
              <span>急速保价</span>
              <span></span>
            </div>
          </div>
          <div class="m-activity-item">
            <div class="m-activity-item-l">
              <span class="icon-mine green2">&#xe612;</span>
            </div>
            <div class="m-activity-item-r specil-border">
              <span>我的兑换</span>
              <span></span>
            </div>
          </div>
          <div class="spacing"></div>
          <div class="m-activity-item">
            <div class="m-activity-item-l">
              <span class="icon-mine orange2">&#xe606;</span>
            </div>
            <div class="m-activity-item-r">
              <span>帮助中心</span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Mine',
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang=scss scoped>
.mine{
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  position: relative;
  .icon{
    display: block;
    position: absolute;
    line-height: 48px;
    padding: 0 5px;
    font-size: 20px;
    color: gray;
  }
  .drop{
    position: absolute;
    right: 0;
  }
  img{
    width: 100%;
    display: block;
  }
  h1{
    padding: 0 30px;
    color: #7F4395;
    font-size: 16px;
    line-height: 50px;
  }
  p{
  display: block;
  font-size: 14px;
  color: #7F4395;
}
}
.orange{
    color:#ec754c;
}
.orange2{
    color: #ee7c6c;
}
.purpul{
    color: #c96cd7;
}
.green1{
    color:#3dccb4;

}
.green2{
    color:#3da5af;
}
.specil-border{
    border:none !important;
}
.debug-txt{
    font-size:11px !important;
}
.nav{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:100%;
  height: 100px;
  .component-nav{
    width:91%;
    height: 54px;
    margin: 0 auto;
    .navLeft{
      display: flex;
      justify-content: end;
      width:45%;
      height: 100%;
      float: left;
      .navLefticon{
        width:40%;
      }
      .navLefttxt{
        width:60%;
        height: 54px;
        float: right;
        span{
          color: #333;
          font-size: 14px;
          line-height:54px;
        }
      }
    }
    .navRight{
      width: 21%;
      height: 23px;
      margin-top:15px;
      float: right;
      background-color: #7F4395;
      border-radius: 10px;
      text-align:center;
      span{
        padding-left:5px;
        color: #eee;
        font-size: 11px;
        line-height: 23px;
      }
    }
  }
}
.spacing{
  height: 16px;
  background:#f4f4f4;
}
.spacing-big{
  height: 147px;
  background: #f4f4f4;
}
.all{
  &-order{
    height: 122px;
    width:100%;
    &-top{
      height: 43px;
      display: flex;
      justify-content: space-between;
      padding: 0 13px;
      span:nth-child(1){
        color: #333333;
        font-size: 12px;
        line-height: 43px;
        font-weight: bolder;
      }
      span:nth-child(2){
        color:#999999;
        font-size: 12px;
        line-height: 43px;
        padding-right: 20px;
      }
    }
    &-payInfo{
      height: 80px;
      display: flex;
      justify-content: space-around;
      border:1px solid #e6e6e6;
      border-width:1px;
      &-item{
        width: 15%;
        height: 80px;
        display: flex;
        flex-direction: column;
        text-align: center;
        .icon-mine{
          font-family: 'iconfont';
          font-size: 19px;
          height: 40px;
          line-height: 60px;
          color: #333333;
        }
        .icon-txt{
          font-size: 11px;
          height: 40px;
          line-height: 30px;
          color: #666666;}
        }
      }
    }
  }
.m{
  &-activity{
    height: 170px;
    color: #333333;
    border:1px solid #e6e6e6;
    border-width: 1px 0;
    &-item{
      cursor: pointer;
      height: 42px;
      &-l{
        width:14%;
        height: 100%;
        float: left;
        text-align: center;
        .icon-mine{
          font-family: 'iconfont';
          font-size: 17px;
          line-height: 40px;
        }
      }
      &-r{
        width:86%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        float: right;
        border-bottom: 1px solid #e6e6e6;

        span{
          font-size:12px;
          line-height: 42px;
        }
        span:nth-child(2){
          color:#999999;
          padding-right: 20px;
        }
      }
    }
  }
}
.mineshezhi{
  cursor: pointer;
}
.help{
    border-bottom:1px solid #e6e6e6;
}
</style>
