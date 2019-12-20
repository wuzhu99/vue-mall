export default {
  data: JSON.parse(localStorage.getItem('data')) || {},
  cartList: JSON.parse(localStorage.getItem('cartList')) || [],
  productsData: {},
  Settlement: [],
  prodata: '',
  user: JSON.parse(localStorage.getItem('user')) || {
    username: '',
    isLogin: false,
    token: '',
    phone: '',
    password: ''
  }
}
