const Home = () => import('pages/Home')
const Classify = () => import('pages/Classify')
const Cart = () => import('pages/Cart')
const Mine = () => import('pages/Mine')
const Detail = () => import('pages/Detail')
const Login = () => import('pages/login')
const ProductList = () => import('pages/ProductList')
const Inquire = () => import('pages/Inquire')
const Setting = () => import('pages/Setting')
const Address = () => import('pages/Address')
const Registered = () => import('pages/Registered')
const Settlement = () => import('pages/Settlement')

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  title: '首页',
  isNav: true,
  icon: '&#xe608;',
  component: Home
}, {
  path: '/classify',
  name: 'classify',
  title: '分类',
  isNav: true,
  icon: '&#xe602;',
  component: Classify
}, {
  path: '/detail/:id',
  name: 'detail',
  component: Detail
}, {
  path: '/cart',
  name: 'cart',
  title: '购物车',
  isNav: true,
  icon: '&#xe60a;',
  component: Cart,
  meta: {
    isAuthrequired: true
  }
}, {
  path: '/mine',
  name: 'mine',
  title: '我的',
  isNav: true,
  icon: '&#xe600;',
  component: Mine,
  meta: {
    isAuthrequired: true
  }
}, {
  path: '/ProductList',
  name: 'ProductList',
  title: '商品列表',
  component: ProductList
}, {
  path: '/Inquire',
  name: 'Inquire',
  title: '商品列表',
  component: Inquire
}, {
  path: '/login',
  name: 'login',
  title: '登录',
  component: Login
}, {
  path: '/Registered',
  name: 'Registered',
  title: '注册',
  component: Registered
}, {
  path: '/Setting',
  name: 'Setting',
  title: '设置',
  component: Setting
}, {
  path: '/Address',
  name: 'Address',
  title: '地址',
  component: Address
}, {
  path: '/Settlement',
  name: 'Settlement',
  title: '订单',
  component: Settlement
}]

export default routes
