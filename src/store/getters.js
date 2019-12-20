export default {
  allPrice (state) {
    return state.Settlement.reduce((result, item) => {
      result += item.saleprice * item.count
      return result
    }, 0)
  },
  TotalCount (state) {
    return state.cartList.reduce((result, item) => {
      result += item.count
      if (result > 99) {
        result = 99
      }
      return result
    }, 0)
  },
  TotalPrice (state) {
    return state.cartList.reduce((result, item) => {
      if (item.ISChecked === true) {
        result += item.saleprice * item.count
      }
      return result
    }, 0)
  },
  // 多选
  AllChecked (state) {
    // 当购物车为空时 全选为false
    if (state.cartList.length === 0) {
      return false
    }
    return state.cartList.every(item => item.ISChecked === true)
  },
  // 单选
  Checked (state, id) {
    state.cartList.map(item => {
      if (item.id === id) {
        return item.ISChecked
      }
    })
  }
}
