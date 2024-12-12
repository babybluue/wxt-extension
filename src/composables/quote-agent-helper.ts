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

const vehicleData: any[] = [
  {
    vin: 'JN1BY1APXBM324025',
    year: '2002',
    make: 'Toyota',
    model: 'Camry',
  },
  {
    vin: '',
    year: '2019',
    make: 'HONDA',
    model: 'ACCORD',
  },
]

const labelKeyMap: Record<string, string> = {
  // Name Insured
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

  // Vehicle Information
  Vin: 'vin',
  Year: 'year',
  Make: 'make',
  Model: 'model',
  'License Number': 'licenseNumber',
}

const user = userEvent.setup()

let resolveMutationObserver: any

const mutationObserverPromise = new Promise(
  (resolve) => (resolveMutationObserver = resolve)
)

const observer = new MutationObserver(() => {
  resolveMutationObserver()
  observer.disconnect()
})

export const clearNameInsured = () => {
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

export const fillNameInsured = async () => {
  const allQuestions = document.querySelectorAll('question')

  for (const question of allQuestions) {
    const label = question
      .querySelector('label')
      ?.textContent?.replace(/:[\*]*/g, '')
    const form =
      question.querySelector('input') || question.querySelector('select')
    if (form && label && Object.keys(labelKeyMap).includes(label)) {
      form.value = mockData[labelKeyMap[label]]
      form.dispatchEvent(
        new Event('change', { bubbles: true, cancelable: true })
      )
    }
    fillPhoneNumber()
  }
}

const fillPhoneNumber = () => {
  const input = document.querySelector(
    '.phone-container input'
  ) as HTMLInputElement
  if (!input) {
    return
  }
  input.value = mockData.phone
  input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
}

export const fillProducts = async () => {
  const table = document.querySelector('question-table')
  if (!table) {
    return
  }
  observer.observe(table, { childList: true, subtree: true })

  const addButton = document.querySelector(
    'add-entity-main .add-new'
  ) as HTMLButtonElement

  for (let i = 0; i < vehicleData.length - 1; i++) {
    addButton?.click()
    await mutationObserverPromise
  }

  const questionRows = document.querySelectorAll('question-row')

  for (let i = 0; i < vehicleData.length; i++) {
    for (const row of questionRows) {
      const label = row
        .querySelector('.row-label label')
        ?.textContent?.replace(/:[\*]*/g, '')
      const question = row.querySelectorAll('question')[i]
      console.log(question)

      observer.observe(question, { childList: true, subtree: true })
      const form =
        question.querySelector('input') || question.querySelector('select')
      if (label === 'VIN' && form && vehicleData[i].vin) {
        const button = question.querySelector('button')
        form.value = vehicleData[i].vin || ''
        form.dispatchEvent(
          new Event('change', { bubbles: true, cancelable: true })
        )
        button?.click()
        await mutationObserverPromise
        break
      }

      if (Object.keys(labelKeyMap).includes(label!)) {
        const select = question.querySelector('select')
        if (select) {
          const options = question.querySelectorAll('option')
          observer.observe(select, { childList: true, subtree: true })
          while (options.length < 1) {
            await mutationObserverPromise
          }
        }

        form!.value = vehicleData[i][labelKeyMap[label!]]
        form!.dispatchEvent(
          new Event('change', { bubbles: true, cancelable: true })
        )
        await mutationObserverPromise
      }
    }
  }
}
