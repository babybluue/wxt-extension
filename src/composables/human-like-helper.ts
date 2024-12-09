export const confirmEnter = (target: Element) => {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      keyCode: 13,
      bubbles: true,
      cancelable: true,
    })
  )
}

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const clickOption = (value: string) => {
  const dropdown = document.querySelectorAll('.ant-select-dropdown')
  dropdown.forEach((element) => {
    if (element.getAttribute('style')?.includes('display: none')) {
      return
    }

    const options = element.querySelectorAll(
      '.ant-select-item.ant-select-item-option'
    ) as NodeListOf<HTMLDivElement>
    options.forEach((option) => {
      if (option.title == value) {
        option.click()
      }
    })
  })
}

export const simulateTyping = async (
  inputElement: HTMLFormElement,
  text: string
) => {
  // 确保输入框可聚焦
  inputElement.focus()

  // 遍历输入的每一个字符
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    await sleep(100)

    // 创建键盘按下事件 (keydown)
    const keydownEvent = new KeyboardEvent('keydown', {
      key: char,
      keyCode: char.charCodeAt(0),
      code: `Key${char.toUpperCase()}`,
      bubbles: true,
      cancelable: true,
    })
    inputElement.dispatchEvent(keydownEvent)

    // 创建字符输入事件 (keypress) - 可选的，但许多浏览器依然支持
    const keypressEvent = new KeyboardEvent('keypress', {
      key: char,
      keyCode: char.charCodeAt(0),
      bubbles: true,
      cancelable: true,
    })
    inputElement.dispatchEvent(keypressEvent)

    // 创建输入事件 (input)，模拟输入框内容的更新
    const inputEvent = new Event('input', { bubbles: true, cancelable: true })
    inputElement.value += char // 更新输入框的值
    inputElement.dispatchEvent(inputEvent)

    // 创建键盘松开事件 (keyup)
    const keyupEvent = new KeyboardEvent('keyup', {
      key: char,
      keyCode: char.charCodeAt(0),
      code: `Key${char.toUpperCase()}`,
      bubbles: true,
      cancelable: true,
    })
    inputElement.dispatchEvent(keyupEvent)
  }
}
