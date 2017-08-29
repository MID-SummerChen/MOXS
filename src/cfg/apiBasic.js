
const devMode = false
const apiHost = "dev.moxs-system.com"
const resHttpPath = `http://dev-res.moxs-system.com`
const apiModule = {
  sys: "moxs_sys",
  sev: "moxs_sev"
}
const apiPath = 'api'
const fakeHost = 'tingmusic'

const setFakeType = false
const fakeType = {code: 'resv', title: '預約記錄', label: '預約'}

export {
  devMode,
  apiHost,
  apiModule,
  apiPath,
  fakeHost,
  fakeType,
  setFakeType,
  resHttpPath,
}