import React from 'react'

import MenuItem from '@mui/material/MenuItem'
import Input from '@Components/atoms/Input'

interface Props {
  Register: any
  Label: string
  Name: string
  Errors: { message: string }
  selectValue: any
  setSelectValue: (arg: string) => void
  options: string[]
}

const SelectInput: React.FC<Props> = ({
  Errors,
  Label,
  Name,
  Register,
  selectValue,
  setSelectValue,
  options,
}) => {
  return (
    <Input
      Register={Register}
      select
      Label={Label}
      value={selectValue}
      Name={Name}
      onChange={(e) => setSelectValue(e.target.value)}
      Errors={Errors}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Input>
  )
}

export default SelectInput
