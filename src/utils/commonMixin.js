import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      genderOpts: [
        { label: "女士", value: "FEMALE" },
        { label: "先生", value: "MALE" },
      ],
      payTypeOpts: [
        { label: "線上付款", value: "ONLINE" },
        { label: "現場付款", value: "ONSITE" },
      ],
      payModeOpts: [
        { label: "信用卡", value: "CREDIT" },
        { label: "ATM轉帳", value: "ATM" },
        { label: "WebATM", value: "WEBATM" },
        { label: "超商付款", value: "CVS" },
        { label: "支票", value: "CHECK" },
        { label: "匯款", value: "TRANSFER" },
      ],
      invoiceTypeOpts: [
        { label: "紙本發票", value: "P" },
        { label: "電子發票", value: "E" },
        { label: "捐贈", value: "D" },
      ],
      resvTypeOpts: [
        { label: "內用", value: "STAYIN" },
        { label: "外帶", value: "TOGO" },
        { label: "外送", value: "DELIVER" },
      ],
      chkStatusOpts: [
        { label: "待驗證", value: "WAIT_VERIFY" },
        { label: "待付款", value: "WAIT_PAY" },
        { label: "已付款", value: "PAID" },
        { label: "待確認", value: "WAIT_CONFIRM" },
        { label: "已確認", value: "CONFIRMED" },
        { label: "已排程", value: "SETTING" },
        { label: "已處理", value: "PREPARED" },
        { label: "已完成", value: "DONE" },
        { label: "已取消", value: "CANCELED" },
        { label: "已過期", value: "DUE" },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'account',
      'isLogin',
      'apiHost',
      'apiModule',
      'checkoutType',
      'resHttpPath',
    ])
  },
  methods: {
    ...mapMutations([
      'CONTROL_MODAL',
    ]),
    ...mapActions([
      'checkLoginStatus'
    ]),
    toImgSrc(pathFile) {
      return pathFile ? `${this.resHttpPath}/${pathFile}` : `/static/imgs/food03.jpg`
    },
    toResvType(value) {
      var i = _.findIndex(this.resvTypeOpts, { value })
      return i > -1 ? this.resvTypeOpts[i].label : ""
    },
    toChkStatus(value) {
      var i = _.findIndex(this.chkStatusOpts, { value })
      return i > -1 ? this.chkStatusOpts[i].label : ""
    },
    toInvoiceType(value) {
      var i = _.findIndex(this.invoiceTypeOpts, { value })
      return i > -1 ? this.invoiceTypeOpts[i].label : ""
    },
    toPayType(value) {
      var i = _.findIndex(this.payTypeOpts, { value })
      return i > -1 ? this.payTypeOpts[i].label : ""
    },
    toPayMode(value) {
      var i = _.findIndex(this.payModeOpts, { value })
      return i > -1 ? this.payModeOpts[i].label : ""
    },
    toGender(value) {
      var i = _.findIndex(this.genderOpts, { value })
      return i > -1 ? this.genderOpts[i].label : ""
    },
    async limitedPageCheck() {
      await this.checkLoginStatus()
      if (this.isLogin === false) {
        this.$router.push({ name: 'Home' })
      }
      if (this.isLogin === null) {
        setTimeout(this.limitedPageCheck, 500)
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    checkValidate(formGroup) {
      formGroup.$touch()
      console.log(formGroup)
      return !formGroup.$invalid
    },
  },
  filters: {
    date(val) {
      return moment(val).format("MM/DD")
    },
    time(val) {
      return moment(val).format("hh:mm")
    },
    fullDateTime(val) {
      return moment(val).format("YYYY/MM/DD HH:mm")
    }
  }
}