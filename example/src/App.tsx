import React from 'react'
import { useState } from 'react'

import ExampleComponent from 'react-mui-calendar'

const App = () => {
  const change = (datesSelected: string[]) => {
    console.log(datesSelected)
    setDates(datesSelected)
  }

  const datesDisabled = [
    '2022-05-16 10:30',
    '2022-05-18 14:00',
    '2022-05-18 14:30',
    '2022-05-20 15:00'
  ]

  const times = ['10:00', '10:30', '11:00']
  const [dates, setDates] = useState<string[]>(['2022-05-16 10:00'])

  return (
    <>
      <ExampleComponent
        times={times}
        dates={dates}
        datesDisabled={datesDisabled}
        change={change}
      />
    </>
  )
}

export default App
