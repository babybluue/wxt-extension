import './style.less'
import '@/assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

export default defineContentScript({
  matches: ['https://weibo.com/u/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    if (ctx.isInvalid) {
      return
    }
    console.log('init')
    const ui = await createShadowRootUi(ctx, {
      name: 'weibo-content-script',
      position: 'overlay',
      anchor: '#app',
      onMount: (container) => {
        const app = createApp(App)
        app.use(Antd).mount(container)
        return app
      },
      onRemove: (app) => app?.unmount(),
    })
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'show') {
        ui.remove()
        ui.mount()
      }
      if (request.message === 'hide') {
        ui.remove()
      }
    })
  },
})
