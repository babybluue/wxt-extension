<template>
  <div>
    <a-button type="primary" @click="handleStart">开始删除</a-button>
    <a-button @click="handleStop">停止删除</a-button>
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, watch } from 'vue'

  const _wrapper = '.vue-recycle-scroller__item-wrapper'
  const _post = '.wbpro-scroller-item'
  const _more = '.woo-pop-ctrl i'
  const _pop = '.woo-pop-wrap-main'
  const _pop_item = '.woo-pop-item-main'
  const _modal_wrap = '.woo-modal-wrap'
  const _confirm_button = '.woo-button-primary'
  const _friend = '.title_wrap_3e__u'
  const _left = '.woo-panel-left'

  let flag: number | string = 0
  let position = 1
  let interval = null
  let isBottom = false

  const sortPost = () => {
    const wrapper = document.querySelector(_wrapper)
    const allPost = wrapper?.querySelectorAll(_post) as NodeListOf<HTMLElement>
    const allPostIndex = Array.from(allPost)
      .map((item) => item.dataset.index)
      .sort()
    const result: HTMLElement[] = []
    allPostIndex.map((index) => {
      allPost.forEach((item) => {
        if (item.dataset.index == index) {
          result.push(item)
        }
      })
    })
    return result
  }

  const deletePost = async (post: HTMLElement) => {
    const isFriend = post.querySelector(_friend)
    if (isFriend) {
      return
    }

    // 更多按钮
    const more = post.querySelector(_more) as HTMLElement
    if (!more) return
    more.click()
    await sleep(500)

    // 删除按钮
    const pop = document.querySelectorAll(`${_pop} ${_pop_item}`)
    const deleteBtn = pop[pop.length - 1] as HTMLElement
    if (!deleteBtn) return
    deleteBtn.click()
    await sleep(500)

    // 确认按钮
    const confirmBtn = document.querySelector(
      `${_modal_wrap} ${_confirm_button}`
    ) as HTMLElement
    if (!confirmBtn) return
    confirmBtn.click()
    await sleep(500)
  }

  const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const scroll = () => {
    window.scrollTo({
      top: 400 * position,
    })
  }

  const getPost = async () => {
    if (
      window.scrollY + window.innerHeight >=
      document.querySelector('#app')!.clientHeight - 5
    ) {
      window.removeEventListener('scroll', scrollEvent)
      return
    }
    const postList = sortPost()
    for (let i = 0; i < postList.length; i++) {
      const post = postList[i]
      flag = post.dataset.index as string
      await deletePost(post)
    }
    position++
    scroll()
  }

  const scrollEvent = async () => {
    await sleep(2000)
    getPost()
  }

  const main = () => {
    window.addEventListener('scroll', scrollEvent)
    window.scrollTo({
      top: 400,
    })
  }

  const handleStart = () => {
    main()
  }

  const handleStop = () => {
    console.log('ddd')

    location.reload()
  }
</script>
