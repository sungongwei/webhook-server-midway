import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587966355823_6909';

  // add your config here
  config.middleware = [
  ];
  config.cluster = {
    listen: {
      port: 3000,
      hostname: '127.0.0.1'
    }
  };
  return config;
};
