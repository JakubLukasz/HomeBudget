import React from 'react'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker'

import Input from '@Components/atoms/Input'

interface Props {
  setDateValue: React.Dispatch<React.SetStateAction<any>>
  dateValue: any
  Label: string
  [x: string]: any
}

const DateInput: React.FC<Props> = ({ Label, dateValue, setDateValue }) => (
  <LocalizationProvider dateAdapter={DateAdapter}>
    <DatePicker
      label={Label}
      mask="____-__-__"
      value={dateValue}
      inputFormat="YYYY-MM-DD"
      onChange={(value) => setDateValue(value)}
      renderInput={(params) => {
        return <Input {...params} />
      }}
    />
  </LocalizationProvider>
)

export default DateInput
