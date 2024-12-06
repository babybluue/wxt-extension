import userEvent from '@testing-library/user-event'
import { confirmEnter } from './human-like-helper'

export const fastAutoFormHelper = () => {
  const datePicker = ['DOB']
  const select = ['Gender']

  const user = userEvent.setup()

  const readClientInfoForm = () => {
    const formArea = document.querySelector('.ant-form div')
    const allForms = formArea?.querySelectorAll('.flex.flex-col.items-start')
    const formData: Record<string, string> = {}
    allForms?.forEach((form) => {
      const label = form.querySelector('div:first-child')?.textContent
      const value = form.querySelector('input')?.value
      if (!label) return
      if (select.includes(label)) {
        const selected = form.querySelector(
          '.ant-select-selection-item'
        ) as HTMLElement
        formData[label] = selected?.title || ''
        return
      }
      formData[label] = value ?? ''
    })

    localStorage.setItem('clientInfo', JSON.stringify(formData))
  }

  const fillClientInfoForm = async () => {
    const formData = JSON.parse(localStorage.getItem('clientInfo') ?? '{}')
    const formArea = document.querySelector('.ant-form div')
    const allForms = formArea?.querySelectorAll('.flex.flex-col.items-start')
    if (!allForms) return
    for (const form of allForms) {
      const label = form.querySelector('div:first-child')?.textContent
      const input = form.querySelector('input')
      if (label && input) {
        if (datePicker.includes(label)) {
          await user.type(input, formData[label])
          confirmEnter(input)
          continue
        }
        if (select.includes(label)) {
          await user.click(input)
          clickOption(formData[label])
          continue
        }
        await user.type(input, formData[label])
      }
    }
  }

  return {
    readClientInfoForm,
    fillClientInfoForm,
  }
}
