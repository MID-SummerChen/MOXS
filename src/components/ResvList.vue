<template>
  <div class="record">
      <div class="record-header">
          最新預約記錄
      </div>
      <div class="item-resv" v-for="resv in resvList" @click="$router.push({name: 'ResvRecordDetail', params: {resv_sn: resv.sn}})">
          <p>
              <span>{{resv.stoResvOptName}}  {{resv.date}} {{resv.startAt}}</span>
              <span class="status">{{toChkStatus(resv.status)}}</span>
          </p>
          <p>{{resv.stoName}} {{resv.adultNum + resv.kidNum}}人 ${{resv.totalPrice}}</p>
      </div>
      <div class="record-footer">
          <button class="btn-t2" @click="$router.push({name: 'MemberRecord'})">查看全部預約記錄</button>
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
      resvList: [],
      ordList: [],
    }
  },
  mounted() {
    this._getAllResv()
    this.limitedPageCheck()
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      'getAllResv',
    ]),
    async _getAllResv() {
      var data = {
        maxRecords: 5,
        orderBy: "date:desc"
      }
      var res = await this.getAllResv(data)
      if(res.code === 10) {
        this.resvList = res.data.items
      }
    },
  }
}
</script>


<style lang="stylus">
</style>