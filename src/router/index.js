import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Checkout from '@/components/Checkout'
import CheckoutResult from '@/components/CheckoutResult'
import Info from '@/components/Info'
import News from '@/components/News'
import Member from '@/components/Member'
import MemberEdit from '@/components/MemberEdit'
import MemberRecord from '@/components/MemberRecord'
import MemberRecordDetail from '@/components/MemberRecordDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products/:lv1?/:lv2?/:lv3?',
      name: 'Products',
      component: Products
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/checkout/result',
      name: 'CheckoutResult',
      component: CheckoutResult
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/member/edit',
      name: 'MemberEdit',
      component: MemberEdit
    },
    {
      path: '/member/record',
      name: 'MemberRecord',
      component: MemberRecord
    },
    {
      path: '/member/record/:resv_sn',
      name: 'MemberRecordDetail',
      component: MemberRecordDetail
    },

  ]
})
