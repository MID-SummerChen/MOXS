import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Maintenance from '@/components/Maintenance'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/Products'
import Checkout from '@/components/Checkout'
import CheckoutResult from '@/components/CheckoutResult'
import Info from '@/components/Info'
import News from '@/components/News'
import Member from '@/components/Member'
import MemberEdit from '@/components/MemberEdit'
import MemberRecord from '@/components/MemberRecord'
import ResvRecordDetail from '@/components/ResvRecordDetail'
import OrdRecordDetail from '@/components/OrdRecordDetail'
import VuexStore from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
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
          path: '/record/resv/:resv_sn',
          name: 'ResvRecordDetail',
          component: ResvRecordDetail
        },
        {
          path: '/record/ord/:ord_sn',
          name: 'OrdRecordDetail',
          component: OrdRecordDetail
        },
      ]
    },
    {
      path: '/maintenance',
      name: 'Maintenance',
      component: Maintenance
    },
    
    

  ]
})


router.beforeEach(async (to, from, next) => {
  await VuexStore.dispatch('checkLoginStatus')
  var res = await VuexStore.dispatch('getSiteConfig')
  if(to.name !== 'Maintenance') {
    if(res.code !== 10) {
      next({name: 'Maintenance'})
    }else {
      next()
    }
  }
  next()
  // VuexStore.commit('GET_LOGIN_INFO')
  // if(!VuexStore.state.isLogin) {
  //     var info = VuexStore.state.loginInfo
  //     console.log(info)
  //     if(info) {
  //       await VuexStore.dispatch('onCheckLogin', {username: info.acc, loginType: info.type})
  //     }
  // }
  
  
})

export default router