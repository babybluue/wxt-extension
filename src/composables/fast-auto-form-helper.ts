import dayjs from 'dayjs'

export const fastAutoFormHelper = () => {
  const readClientInfoForm = () => {
    const formArea = document.querySelector('.ant-form div')
    const allForms = formArea?.querySelectorAll('.flex.flex-col.items-start')
    const formData: Record<string, string> = {}
    allForms?.forEach((form) => {
      const label = form.querySelector('div:first-child')?.textContent
      const value = form.querySelector('input')?.value
      if (label) {
        formData[label] = value ?? ''
      }
    })

    localStorage.setItem('clientInfo', JSON.stringify(formData))
  }

  const fillClientInfoForm = () => {
    const formData = JSON.parse(localStorage.getItem('clientInfo') ?? '{}')
    const formArea = document.querySelector('.ant-form div')
    const allForms = formArea?.querySelectorAll('.flex.flex-col.items-start')
    allForms?.forEach((form) => {
      const label = form.querySelector('div:first-child')?.textContent
      const input = form.querySelector('input')
      if (label && input) {
        if (label === 'DOB') {
          // input.value = dayjs(formData[label]).toString()
          // input.dispatchEvent(new Event('input'))
          // console.log(formData[label], dayjs(formData[label]).toString())
          // input.dispatchEvent(new Event('input', { bubbles: true }))
          // input.readOnly = false
          input.focus()
          input.value = formData[label] ?? '2050/02/02'
          input.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
          )
          // input.dispatchEvent(
          //   new KeyboardEvent('keydown', {
          //     key: 'Enter',
          //     code: 'Enter',
          //     bubbles: true,
          //   })
          // )
        }
        if (label === 'Gender') {
          input.dispatchEvent(new Event('input'))
          input.value = formData[label] ?? ''
          input.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
          )
        } else {
          // input.value = formData[label] ?? ''
          // input.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
    })
  }

  return {
    readClientInfoForm,
    fillClientInfoForm,
  }
}
