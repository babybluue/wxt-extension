import './style.less'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/tailwind.css'

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
        app.mount(container)
        return app
      },
      onRemove: (app) => app?.unmount(),
    })

    ui.mount()
  },
})
