import { MessageBox } from 'mint-ui'
export default {
  // 添加到列表
  toProducts (state, productsData) {
    state.productsData = productsData
  },
  // 添加到详情
  toDetail (state, item) {
    item.count = item.count ? item.count : 1
    item.ISChecked = item.ISChecked ? item.ISChecked : false
    state.data = item
  },
  // 添加到购物车
  toCart (state, item) {
    if (item !== null) {
      let has = state.cartList.some(data => data.id === item.id)
      // 判断是否有相同商品
      if (has) {
        state.cartList.map(cartItem => {
          if (cartItem.id === item.id) {
            cartItem.count += item.count
          }
        })
      } else {
        state.cartList.push(item)
      }
    }
  },
  // detail->Settlement
  goDetailShop (state, item) {
    state.Settlement = []
    state.Settlement.push(item)
  },
  // cart->Settlement
  goCartShop (state) {
    state.Settlement = []
    state.cartList.reduce((result, item) => {
      if (item.ISChecked === true) {
        state.Settlement.push(item)
      }
    }, 0)
  },
  // 加数量
  addCount (state, id) {
    state.cartList.map(item => {
      if (item.id === id) {
        item.count++
        if (item.count > 50) {
          item.count = 50
        }
      }
    })
    state.cartList = Object.assign([], state.cartList)
  },
  // 减数量
  reduceCount (state, id) {
    state.cartList.map(item => {
      if (item.id === id) {
        item.count--
        if (item.count === 0) {
          MessageBox.confirm(' ', {
            message: '确认删除',
            title: '',
            confirmButtonText: '确认'
          }).then(({ action }) => {
            state.cartList = state.cartList.filter(cartItem => (cartItem.id !== id))
          }).catch(err => {
            item.count = 1
            state.cartList = Object.assign([], state.cartList)
            err = null
          })
          item.count = 1
          state.cartList = Object.assign([], state.cartList)
        }
      }
    })
    state.cartList = Object.assign([], state.cartList)
  },
  // 删除商品
  delItem (state, id) {
    MessageBox.confirm(' ', {
      message: '确认删除',
      title: '',
      confirmButtonText: '确认'
    }).then(({ action }) => {
      state.cartList = state.cartList.filter(item => (item.id !== id))
    }).catch(err => {
      err = null
    })
    state.cartList = Object.assign([], state.cartList)
  },
  // 多选
  handlAllChecked (state, isAllChecked) {
    // 多选为ture的时候 将所有的改为false
    if (isAllChecked) {
      state.cartList.map(item => {
        item.ISChecked = false
      })
    } else {
      state.cartList.map(item => {
        item.ISChecked = true
      })
    }
    state.cartList = Object.assign([], state.cartList)
  },
  // 单选
  handlItemChecked (state, id) {
    // 改变这个item的状态
    state.cartList.map(item => {
      if (item.id === id) {
        item.ISChecked = !item.ISChecked
      }
    })
    state.cartList = Object.assign([], state.cartList)
  },
  // 注册成功
  regSuccess (state, user) {
    state.user = {
      ...user,
      isLogin: true,
      address: []
    }
  },
  // 登陆成功
  loginSuccess (state, user) {
    state.user = {
      ...state.user,
      isLogin: true
    }
  },
  // 退出登录
  dropSuccess (state) {
    state.user.isLogin = false
  },
  // 加数量
  dataAddCount (state) {
    state.data.count++
    if (state.data.count > 50) {
      state.data.count = 50
    }
  },
  // 减数量
  dataReduceCount (state) {
    state.data.count--
    if (state.data.count < 1) {
      state.data.count = 1
    }
  },
  // 添加地址
  Address (state, addressData) {
    state.user.address.push(addressData)
  },
  // 修改地址
  setAddress (state, address) {
    state.user.address.splice(address.id, 1, address.value)
  },
  // 删除地址
  delAddress (state, id) {
    state.user.address.splice(id, 1)
  },
  // 设置默认地址
  setTopAddress (state, id) {
    let data = state.user.address[id]
    state.user.address.splice(id, 1)
    state.user.address.splice(0, 0, data)
  },
  // 修改密码
  setPass (state, value) {
    state.user.password = value
  }
}
