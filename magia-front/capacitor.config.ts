import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'magia-front',
  webDir: 'www', server: {
    cleartext: true,
    androidScheme: 'http',
    allowNavigation: ['193.186.4.203:3000']
  }
};

export default config;
