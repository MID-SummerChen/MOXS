<template>

  <v-content>
    
    <v-container fluid>
      <div class="main-title">
        <ul>
          <li>
            <router-link :to="{name: 'Products'}">所有產品</router-link>
          </li>
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
          <div v-if="t.imgUrl" class="img-wrap" :style="{'background-image': 'url(' + toImgSrc('sev', t.imgUrl) + ')'}"></div>
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
        itemsCls: [],
        items: [],
        breadcrumb: [],
      }
    },
    mounted() {
      this.updateItems()
    },
    watch: {
      $route() {
        this.itemsCls = []
        this.items = []
        this.breadcrumb = []
        this.updateItems()
      }
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
        this._getItemsCls()
        this._getItems()
      },
      async _getItemsCls() {
        var data = {
          superId: this.$route.query.id
        }
        var res = await this.getItemsCls(data)
        if(res.code === 10) {
          this.itemsCls = res.data.children
          this.breadcrumb = this.breadcrumb.concat(res.data.parent)
          if(res.data.current) {
            this.breadcrumb = [res.data.current].concat(this.breadcrumb)
          }
        }
      },
      async _getItems() {
        var data = {
          clsId: this.$route.query.id
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