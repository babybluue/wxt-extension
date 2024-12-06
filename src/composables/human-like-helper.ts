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
