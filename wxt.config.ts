import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  srcDir:'src',
  runner:{
    binaries:{
      chrome:'C:/Program Files/Google/Chrome/Application/chrome.exe'
    }

  },
  modules: ['@wxt-dev/module-vue'],
  vite:()=>({}),
  manifest:{
    name:'Ext Demo',
    icons:{
      16: '/icons/icon16.jpg',
      24: '/icons/icon24.jpg',
      48: '/icons/icon48.jpg',
      96: '/icons/icon96.jpg',
      128: '/icons/icon128.jpg',
    },
    permissions:['storage','tabs']
  }
});
