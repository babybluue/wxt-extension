import '@/assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

export default defineContentScript({
  matches: ['https://wf3.verge.group/producer/*'],
  // cssInjectionMode: 'ui',
  async main(ctx) {
    if (ctx.isInvalid) {
      return
    }

    // const ui = await createShadowRootUi(ctx, {
    //   name: 'producer-content-ui',
    //   position: 'inline',
    //   anchor: '#app',
    //   onMount: (container) => {
    //     const app = createApp(App)
    //     app.use(Antd).mount(container)
    //     return app
    //   },
    //   onRemove: (app) => app?.unmount(),
    // })
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: '#app',
      onMount: (container) => {
        // Create the app and mount it to the UI container
        const app = createApp(App)
        app.mount(container)
        return app
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount()
      },
    })
    ui.mount()
  },
})
