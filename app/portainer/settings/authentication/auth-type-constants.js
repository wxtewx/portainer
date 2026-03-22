export const authenticationActivityTypesMap = {
  AuthSuccess: 1,
  AuthFailure: 2,
  Logout: 3,
};

export const authenticationActivityTypesLabels = {
  [authenticationActivityTypesMap.AuthSuccess]: '认证成功',
  [authenticationActivityTypesMap.AuthFailure]: '认证失败',
  [authenticationActivityTypesMap.Logout]: '退出登录',
};
