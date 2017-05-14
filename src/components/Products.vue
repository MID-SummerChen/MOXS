<template>

  <v-content>
    
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li v-for="b in bread">
            <router-link :to="b.link">{{b.name}}</router-link>
          </li>
        </ul>
      </div>
      <div v-if="itemsCls.length > 0" class="category-btn-group">
        <!--<i v-if="itemsCls[0].parentId" class="prevClsBtn fa fa-arrow-left" @click="goBack"></i>-->
        <el-button v-for="cls in itemsCls" :disabled="cls.childrenCount === 0" @click="toNextCls(cls.id, cls.level)">{{cls.name}}</el-button>
      </div>

      <div class="items" data-uk-grid="{gutter: 0}">
        <el-card v-for="t in items" :body-style="{ padding: '0px' }">
              <div class="img-wrap">
              </div>
              <div class="card-content">
                <div class="card-content-title">
                  <p class="title">{{t.desc}}</p>
                  <p class="dollar">$180</p>
                </div>
                <div class="icon-plus"  @click="onClickItem(t.sn)"></div>
              </div>
            </el-card>
          </el-col>
      </div>

    </v-container>
  </v-content>

</template>

<script>
  import eventHub from '@/utils/eventHub'
  import commonMixin from '@/utils/commonMixin'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'Products',
    mixins: [commonMixin],
    components: {
    },
    data() {
      return {
        isShowCart: false,
        currentClsId: "",
        itemsCls: [],
        items: [],
        currentCls: [],
        bread: [
          {name: "主餐", link: "/"},
          {name: "美式", link: "/"},
          {name: "漢堡", link: "/"},
        ]
      }
    },
    mounted() {
      this.updateItems()
    },
    watch: {
      $route: "updateItems"
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapMutations([
        'controlModal',
        'gotProductData',
      ]),
      ...mapActions([
        'getItems',
        'getItemsCls',
        'getItem',
      ]),
      updateItems() {
        this.currentClsId = ""
        this.items = []
        // this.itemsCls = []
        var keys = Object.keys(this.$route.query)
        if(keys.length > 0) {
          console.log(_.map(this.$route.query)[keys.length-1])
          this.currentClsId = _.map(this.$route.query)[keys.length-1]
        }
        this._getItemsCls()
        this._getItems()
      },
      async _getItemsCls() {
        var data = {
          superId: this.currentClsId
        }
        var res = await this.getItemsCls(data)
        if(res.code === 10) {
          this.itemsCls = res.data
        }
      },
      async _getItems() {
        var data = {
          clsId: this.currentClsId
        }
        var res = await this.getItems(data)
        if(res.code === 10) {
          this.items = res.data.items
        }
      },
      async onClickItem(itemSn) {
        var res = await this.getItem(itemSn)
        if(res.code === 10) {
          this.gotProductData(res.data)
          this.controlModal({target: 'product', boo: true})
        }
      },
      toNextCls(clsId, clsLevel) {
        this.$router.push({name: 'Products', query: {
          ...this.$route.query,
          [`lv${clsLevel}`]: clsId
        }})
      }
    }
  }

</script>


<style lang="stylus">

</style>