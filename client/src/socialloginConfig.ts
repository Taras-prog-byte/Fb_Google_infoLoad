import {
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angular5-social-login';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2203659926599837')
  }
]);

export function provideConfig() {
  return config;
}
