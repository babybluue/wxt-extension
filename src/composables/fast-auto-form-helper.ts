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
      const antFormItem = form.querySelector('.ant-form-item')
      antFormItem?.classList.add(
        'ant-form-item-has-feedback',
        'ant-form-item-has-success'
      )
      const input = form.querySelector('input')
      if (label && input) {
        input.value = formData[label] ?? ''
        input.dispatchEvent(new Event('input'))
      }
    })
  }

  return {
    readClientInfoForm,
    fillClientInfoForm,
  }
}
