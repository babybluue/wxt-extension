import App from './App.vue'
import '@/assets/tailwind.css'
import { createApp } from 'vue'

export default defineContentScript({
  matches: ['https://policyservicing.apps.foragentsonly.com/app/policy-hub/*'],
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
