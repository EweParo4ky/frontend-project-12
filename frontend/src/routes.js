const apiPath = '/api/v1';

export default {
  loginApiPath: () => [apiPath, 'login'].join('/'),
  singupApiPath: () => [apiPath, 'signup'].join('/'),
  dataApiPath: () => [apiPath, 'data'].join('/'),
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  signupPagePath: () => '/signup',
};
