<template>
  <div></div>
</template>
<script lang="ts" setup>
  const insertButton = () => {
    const button = document.createElement('button')
    button.innerText = 'Get Info'
    button.classList.add(
      'btn',
      'absolute',
      'top-[14%]',
      'left-[50%]',
      '-translate-x-1/2'
    )
    document.body.appendChild(button)
    button.addEventListener('click', () => getPolicyInfo())
  }

  const getPolicyInfo = () => {
    const policySection = document.querySelector('ps-policy-at-a-glance')
    const paymentSection = document.querySelector('ps-billing-and-payments')
    const peopleSection = document.querySelector('ps-drivers')
    const vehicleSection = document.querySelector('ps-vehicles')

    const policyInfo: any = {}
    const paymentInfo: any = {}
    const peopleInfo: any[] = []
    const vehicleInfo: any[] = []

    policySection?.querySelectorAll('pui-tile dl').forEach((dl) => {
      const dt = dl.querySelectorAll('dt')
      const dd = dl.querySelectorAll('dd')

      dt.forEach((item, i) => {
        policyInfo[item.textContent?.trim()!] = dd[i].textContent?.trim()!
      })
    })

    paymentSection?.querySelectorAll('pui-tile  dl').forEach((dl) => {
      const dt = dl.querySelectorAll('dt')
      const dd = dl.querySelectorAll('dd')

      dt.forEach((item, i) => {
        paymentInfo[item.textContent?.trim()!] = dd[i].textContent?.trim()!
      })
    })

    peopleSection
      ?.querySelectorAll('div[role="group"]')
      .forEach((div, index) => {
        peopleInfo.push({})
        const button = div.querySelector(
          '.internalInfo button'
        ) as HTMLButtonElement
        button?.click()
        const dls = div.querySelectorAll('dl')
        dls.forEach((dl) => {
          const dt = dl.querySelector('dt')
          const dd = dl.querySelector('dd')
          peopleInfo[index][dt?.textContent?.trim()!] = dd?.textContent?.trim()
        })
      })

    vehicleSection
      ?.querySelectorAll('div[role="group"]')
      .forEach((div, index) => {
        vehicleInfo.push({})
        const button = div.querySelector(
          '.internalInfo button'
        ) as HTMLButtonElement
        button?.click()
        const dls = div.querySelectorAll('dl')
        dls.forEach((dl) => {
          const dt = dl.querySelector('dt')
          const dd = dl.querySelector('dd')
          vehicleInfo[index][dt?.textContent?.trim()!] =
            dd?.textContent?.trim() || ''
        })
      })

    console.log(policyInfo)
    console.log(paymentInfo)
    console.log(peopleInfo)
    console.log(vehicleInfo)
  }

  onMounted(() => {
    window.addEventListener('load', () => insertButton())
  })
</script>
<style lang="less" scoped></style>
