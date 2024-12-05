<template>
  <div>hello</div>
</template>
<script lang="ts" setup>
  import { fastAutoFormHelper } from '@/composables/fast-auto-form-helper'
  import { computed, reactive, ref, watch } from 'vue'

  const _createBtn = '.operate-area button.ant-btn-primary'
  const _personalAuto = '.ant-modal-body .default-item'
  const _modalName = '.pc-form-modal .ant-modal-title'

  const observer = ref<MutationObserver | null>(null)

  const { readClientInfoForm, fillClientInfoForm } = fastAutoFormHelper()

  const addFillBtn = (title: Element) => {
    const button = document.createElement('button')
    button.textContent = 'Fill'
    button.classList.add('ant-btn-primary', 'ant-btn', 'fill-btn')
    button.setAttribute('style', 'position:absolute;right:52px;top:10px')
    button.addEventListener('click', () => {
      console.log('You clicked the fill button')
      const progress = document.querySelector('.progress')
      if (progress?.classList.contains('step-1')) {
        fillClientInfoForm()
      }
      if (progress?.classList.contains('step-2')) {
        //
      }
      if (progress?.classList.contains('step-3')) {
        //
      }
    })
    title.parentNode?.insertBefore(button, title.nextSibling)
  }

  const addReadBtn = (title: Element) => {
    const button = document.createElement('button')
    button.textContent = 'Read'
    button.classList.add('ant-btn-primary', 'ant-btn', 'fill-btn')
    button.setAttribute('style', 'position:absolute;right:120px;top:10px')
    button.addEventListener('click', () => {
      console.log('You clicked the read button')
      const progress = document.querySelector('.progress')
      if (progress?.classList.contains('step-1')) {
        readClientInfoForm()
      }
      if (progress?.classList.contains('step-2')) {
        //
      }
      if (progress?.classList.contains('step-3')) {
        //
      }
    })
    title.parentNode?.insertBefore(button, title.nextSibling)
  }
  const handleChange = () => {
    const title = document.querySelector(_modalName)
    if (title && title.textContent === 'Verge Quick Personal Auto Quote') {
      if (document.querySelector('.fill-btn')) {
        return
      }

      addFillBtn(title)
      addReadBtn(title)
    }
  }

  onMounted(() => {
    const app = document.querySelector('#app')
    observer.value = new MutationObserver(() => {
      handleChange()
    })
    if (app) {
      observer.value.observe(app, {
        childList: true,
        subtree: true,
      })
    }

    // nextTick().then(() => {
    //   console.log(document.querySelector(_createBtn))
    // })
    // console.log(document.querySelector(_createBtn))

    // document.querySelector(_createBtn)?.addEventListener('click', () => {
    //   console.log('You clicked the create button')
    //   document.querySelector(_personalAuto)?.addEventListener('click', () => {
    //     console.log('You chosen the personal auto option')
    //   })
    // })
  })

  onBeforeUnmount(() => {
    observer.value?.disconnect()
  })
</script>
<style lang="less" scoped></style>
