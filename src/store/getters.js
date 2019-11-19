const getters = {
  token: state => state.user.token,
  rootId: state => state.user.rootId,
  orgName: state => state.user.orgName,
  userInfo: state => state.user.userInfo,
  newPhone: state => state.person.newPhone
}
export default getters
