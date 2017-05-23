<template>
  <div id="member-pw-modal" class="my-modal-wrap" @click.self="controlModal({target: 'memberPw', boo: false})">
    <div class="modal-box">
      <div class="modal-box-content">
        <h5>修改帳戶密碼</h5>
        <form>
            <div class="form-group">
                <label>原密碼</label>
                <input type="password" v-model="formData.oldPw">
                <p class="error" v-if="$v.formData.$dirty && !$v.formData.oldPw.required">此為必填</p>
            </div>
            <div class="form-group">
                <label>新密碼</label>
                <input type="password" v-model="formData.newPw">
                <p class="error" v-if="$v.formData.$dirty && !$v.formData.newPw.required">此為必填</p>
            </div>
            <div class="form-group">
                <label>確認密碼</label>
                <input type="password" v-model="formData.newPw_c">
                <p class="error" v-if="$v.formData.$dirty && !$v.formData.newPw_c.required">此為必填</p>
                <p class="error" v-if="$v.formData.$dirty && !$v.formData.newPw_c.sameAs">密碼不同</p>
            </div>
        </form>
      </div>
      <div class="modal-box-footer">
        <button @click="controlModal({target: 'memberPw', boo: false})">取消</button>
        <button class="blue-text" @click="handleUpdatePw">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  import { required, minLength, between, sameAs } from 'vuelidate/lib/validators'
  import commonMixin from '@/utils/commonMixin'
  export default {
    name: 'MemberPwModal',
    mixins: [commonMixin],
    data() {
      return {
        formData: {
          oldPw: "",
          newPw: "",
          newPw_c: "",
        }
      }
    },
    validations: {
      formData: {
        oldPw: {
          required
        },
        newPw: {
          required
        },
        newPw_c: {
          required,
          sameAs: sameAs('newPw')
        },
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
        'updatePw'
      ]),
      async handleUpdatePw() {
        if(this.checkValidate(this.$v.formData)) {
          var f = this.formData
          var data = {
            oldPw: f.oldPw,
            newPw: f.newPw,
          }
          var res = await this.updatePw(data)
          if(res.code === 10) {
            this.controlModal({target: "memberPw", boo: false})
            this.$message({
                message: '密碼更新成功',
                type: 'success'
            });
          }
        }
        
      }

    }
  }

</script>

<style lang="stylus">

</style>