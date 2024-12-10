import App from './App.vue'
import '@/assets/tailwind.css'
import { createApp } from 'vue'

export default defineContentScript({
  matches: ['https://quoting.foragentsonly.com/Quote/Index/*'],
  async main(ctx) {
    const ui = await createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
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
