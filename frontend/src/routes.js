const apiPath = '/api/v1';

export default {
  loginApiPath: () => [apiPath, 'login'].join('/'),
  singupApiPath: () => [apiPath, 'singup'].join('/'),
  dataApiPath: () => [apiPath, 'data'].join('/'),
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  signupPagePath: () => '/signup',
};
