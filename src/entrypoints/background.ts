export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })
  chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Active tab changed', activeInfo)
  })

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status !== 'complete' || !tab.url?.includes('weibo.com')) {
      return
    }
    console.log(tab)

    if (tab.url?.startsWith('https://weibo.com/u')) {
      chrome.tabs.sendMessage(tabId, { message: 'show' })
    } else {
      chrome.tabs.sendMessage(tabId, { message: 'hide' })
    }
  })
})
