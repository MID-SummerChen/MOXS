<template>

  <v-content>
    
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li v-for="b in breadcrumb">
            <router-link :to="{name: 'Products', query: {id: b.id}}">{{b.name}}</router-link>
          </li>
        </ul>
      </div>
      <div v-if="itemsCls.length > 0" class="category-btn-group">
        <!--<i v-if="itemsCls[0].parentId" class="prevClsBtn fa fa-arrow-left" @click="goBack"></i>-->
        <el-button v-for="cls in itemsCls" @click="toNextCls(cls.id, cls.level)">{{cls.name}}</el-button>
      </div>
      <div v-else style="padding-top: 42px">
        
      </div>

      <div class="items" data-uk-grid="{gutter: 0}">
        <el-card v-for="t in items" :body-style="{ padding: '0px' }" @click.native="onClickItem(t.sn)">
          <div class="img-wrap"></div>
          <div class="card-content">
            <div class="card-content-title">
              <p class="desc">{{t.name}}</p>
              <p class="dollar">{{t.price ? '$'+t.price : ''}}</p>
            </div>
            <div class="icon-plus"></div>
          </div>
          
        </el-card>
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
        breadcrumb: [],
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
        'CONTROL_MODAL',
        'SAVE_CURRENT_PRODUCT',
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
        if(this.$route.query.id) {
          this.currentClsId = this.$route.query.id
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
          this.itemsCls = res.data.children
          this.breadcrumb = _(this.breadcrumb).concat(res.data.parent).value()
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
        this.SAVE_CURRENT_PRODUCT(itemSn)
        this.CONTROL_MODAL({target: 'product', boo: true})
      },
      toNextCls(clsId, clsLevel) {
        this.$router.push({name: 'Products', query: {
          id: clsId
        }})
      }
    }
  }

</script>


<style lang="stylus">

</style>