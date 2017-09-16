/**
 * 本機測試項目: FBID 及 subDomain
 * 
 * == 選項 ============
 * 楊老師 caffeyang
 * 廷氏 tingmusic
 * 早餐 breakfast
 * 便當 senchuan
 * 飲料 shake
 * =================
 * 
 */
const devMode = true 
const fakeFBId = '119590558602110'
const fakeSubdomain = 'tingmusic'


/**
 * 本機測試項目: 訂單及預約
 */
const setFakeType = false
var fakeTypeOpts = [
  {code: 'ord', title: '訂單記錄', label: '訂單'},
  {code: 'resv', title: '預約記錄', label: '預約'},
]
const fakeType = fakeTypeOpts[0]




/**
 * 依照網址判斷為測試獲正視環境 變換API HOST
 */
var envType = document.domain.search(/localhost/g) > -1 || document.domain.search(/dev/g) > -1 ? 'dev' : 'prod'
var apiHostOpts = {
  dev: "dev.moxs-system.com",
  prod: "www.moxs-system.com",
} 
var resHttpPathOpts = {
  dev: "http://dev-res.moxs-system.com",
  prod: "http://res.moxs-system.com",
} 
var apiHost = apiHostOpts[envType]

const resHttpPath = resHttpPathOpts[envType]

const apiModule = {
  sys: "moxs_sys",
  sev: "moxs_sev"
}
const apiPath = 'api'


export {
  devMode,
  apiHost,
  apiModule,
  apiPath,
  fakeFBId,
  fakeSubdomain,
  fakeType,
  setFakeType,
  resHttpPath,
}