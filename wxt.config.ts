import { defineConfig } from 'wxt'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  srcDir: 'src',
  runner: {
    binaries: {
      chrome: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    },
    disabled: true,
  },
  modules: ['@wxt-dev/module-vue'],

  vite: () => ({
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
      }),
    ],
  }),
  manifest: {
    name: 'Ext Demo',
    icons: {
      '16': 'icons/icon-16.png',
      '32': 'icons/icon-32.png',
      '48': 'icons/icon-48.png',
      '64': 'icons/icon-64.png',
      '128': 'icons/icon-128.png',
    },
    permissions: ['storage', 'tabs', 'webRequest'],
    host_permissions: ['https://*/*', 'http://*/*'],
  },
})
