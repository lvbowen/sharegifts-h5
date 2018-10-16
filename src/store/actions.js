

const actions = {
  getActiveId({commit}, value) {
    commit("GET_ACTIVE_ID", value)
  },
  getReportObj({commit},value) {
    commit("GET_REPORT_OBJ", value)
  },
  getAccounrObj({commit},value) {
    commit("GET_ACCOUNT_OBJ", value)
  },
  getStatus({commit},value) {
    commit("GET_STATUS", value)
  },
  getReObj({commit},value) {
    commit("GET_RE_OBJ", value)
  },
  editReport({commit},value) {
    commit("EDIT_REPORT", value)
  }
}
export default actions
