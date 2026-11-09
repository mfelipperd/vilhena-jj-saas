import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.vilhena.app',
  appName: 'EQUIPE VILHENA JIU-JITSU',
  webDir: 'dist',
  server: {
    url: 'https://suaacademia.com.br',
    cleartext: false,
    androidScheme: 'https'
  }
};

export default config;
