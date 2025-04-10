import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ruosai.app',
  appName: 'RuosAI智能工作流助手',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: 'ruosai.keystore',
      keystorePassword: 'ruosai2025',
      keystoreAlias: 'ruosai',
      keystoreAliasPassword: 'ruosai2025'
    }
  }
};

export default config; 