const mutations = {
  GET_ACTIVE_ID(state, value) {
    state.activeId = value
  },
  GET_REPORT_OBJ(status, value){
    status.reportObj = value
  },
  GET_ACCOUNT_OBJ(status, value){
    status.accountInfo = value
  },
  GET_STATUS(status,value){
    status.status = value
  },
  GET_RE_OBJ(status,value){
    status.resupplyObj=value
  },
  EDIT_REPORT(status,value){
    status.editReportObj=value
  }
}
export default mutations
