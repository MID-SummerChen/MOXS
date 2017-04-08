import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Checkout from '@/components/Checkout'
import CheckoutResult from '@/components/CheckoutResult'
import Info from '@/components/Info'
import Member from '@/components/Member'
import MemberEdit from '@/components/MemberEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/checkout-result',
      name: 'CheckoutResult',
      component: CheckoutResult
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
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

  ]
})
