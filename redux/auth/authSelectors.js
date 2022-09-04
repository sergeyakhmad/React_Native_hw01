const getAuthStatus = (state) => state.auth.authStatus;
const getUserName = (state) => state.auth.login;
const getUserId = (state) => state.auth.userId;

const authSelector = {
  getAuthStatus,
  getUserName,
  getUserId,
};

export default authSelector;
