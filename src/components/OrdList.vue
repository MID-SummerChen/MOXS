<template>
  <div class="record">
      <div class="record-header">
          最新訂單記錄
      </div>
      <div class="item-ord" v-for="ord in ordList" @click="$router.push({name: 'OrdRecordDetail', params: {ord_sn: ord.ordSn}})">
          <span>{{ord.ordSn}}</span>
          <span>{{ord.createAt | fullDate}}</span>
          <span class="price">{{ord.ordTotalPrice}}元</span>
          <span class="status">{{toChkStatus(ord.ordStatus)}}</span>
      </div>
      <div class="record-footer">
          <button class="btn-t2" @click="$router.push({name: 'MemberRecord'})">查看所有訂單</button>
      </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import eventHub from '@/utils/eventHub'
import commonMixin from '@/utils/commonMixin'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Products',
  mixins: [commonMixin],
  components: {
    HeaderCpt: Header,
    SideBar,
  },
  data() {
    return {
      ordList: [],
    }
  },
  mounted() {
    this._getAllOrd()
    this.limitedPageCheck()
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      'getAllOrd',
    ]),
    async _getAllOrd() {
      var data = {
        maxRecords: 5,
        orderBy: "createAt: desc"
      }
      var res = await this.getAllOrd(data)
      if(res.code === 10) {
        this.ordList = res.data.items
      }
    },
  }
}
</script>


<style lang="stylus">
</style>