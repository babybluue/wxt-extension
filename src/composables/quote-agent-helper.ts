import userEvent from '@testing-library/user-event'

const mockData: Record<string, string> = {
  firstName: 'John',
  middleName: 'Doe',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  birthday: '01/01/1990',
  phone: '123-456-7890',
  gender: 'M',
  licenseNumber: '123456789',

  address: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
  year: '2022',
  make: 'Toyota',
  model: 'Camry',
}

const labelKeyMap: Record<string, string> = {
  'First Name': 'firstName',
  'Middle Initial': 'middleName',
  'Last Name': 'lastName',
  'Date of Birth': 'birthday',
  Gender: 'gender',
  'Mailing Address Line 1': 'address',
  'Mailing Address Line 2': '',
  City: 'city',
  State: 'state',
  'ZIP Code': 'zip',
  'Phone Type/Number': 'phone',
  'Customer Email': 'email',
  Year: 'year',
  Make: 'make',
  Model: 'model',
  'License Number': 'licenseNumber',
}

const user = userEvent.setup()

export const clearForm = () => {
  const allQuestions = document.querySelectorAll('question')
  allQuestions.forEach((question) => {
    const label = question
      .querySelector('label')
      ?.textContent?.replace(/:[\*]*/g, '')
    const form =
      question.querySelector('input') || question.querySelector('select')

    if (form && label && Object.keys(labelKeyMap).includes(label)) {
      const inputEvent = new Event('input')
      form.dispatchEvent(inputEvent)
      form.value = ''
    }
  })
}

export const fillForm = async () => {
  const allQuestions = document.querySelectorAll('question')

  for (const question of allQuestions) {
    const label = question
      .querySelector('label')
      ?.textContent?.replace(/:[\*]*/g, '')
    const form =
      question.querySelector('input') || question.querySelector('select')
    if (form && label && Object.keys(labelKeyMap).includes(label)) {
      await sleep(100)
      form.focus()
      await sleep(100)
      form.click()
      form.value = mockData[labelKeyMap[label]]
      form.dispatchEvent(new Event('input'))
      form.dispatchEvent(new Event('change'))
      await sleep(100)
      form.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }))
      form.blur()
    }
  }
}
