<template>
  <div></div>
</template>
<script lang="ts" setup>
  const handleClick = (type: 'clear' | 'insert') => {
    const nav = document.querySelector('nav.main-nav')
    const steps = nav?.querySelectorAll('ul > li')
    if (!steps) return
    const currentStep = Array.from(steps).findIndex((step) =>
      step.classList.contains('current')
    )
    if (currentStep === 0) {
      if (type === 'clear') {
        clearNameInsured()
      }
      if (type === 'insert') {
        fillNameInsured()
      }
    }

    if (currentStep === 1) {
      if (type === 'clear') {
        // clearForm()
      }
      if (type === 'insert') {
        fillProducts()
      }
    }
  }

  const insertButton = () => {
    const header = document.querySelector('header')
    if (!header) {
      return
    }

    const button = document.createElement('button')
    button.classList.add(
      'w-[100px]',
      'h-[32px]',
      'bg-blue-500',
      'rounded-md',
      'outline-none',
      'mr-2'
    )

    const insertButton = button.cloneNode(true)
    const clearButton = button.cloneNode(true)

    insertButton.textContent = 'Insert'
    clearButton.textContent = 'Clear'

    insertButton.addEventListener('click', () => handleClick('insert'))
    clearButton.addEventListener('click', () => handleClick('clear'))
    header.append(insertButton, clearButton)
  }

  onMounted(() => {
    console.log('ext init')
    window.addEventListener('load', () => {
      insertButton()
    })
  })
</script>
<style lang="less" scoped></style>
