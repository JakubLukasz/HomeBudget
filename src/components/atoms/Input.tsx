import React from 'react'
import { styled } from '@mui/styles'
import { TextField } from '@mui/material'

const InputField = styled(TextField)({
  flex: 1,
  '& label,& input,& p': {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  '& p': {
    fontSize: '0.7rem',
  },
})

interface Props {
  Register?: any
  Name?: string
  Label?: string
  Errors?: { message: string }
  Type?: string
  Value?: any
  [x: string]: any
}

const Input: React.FC<Props> = ({
  Name,
  Label,
  Errors,
  Register,
  Type,
  Value,
  ...rest
}) => (
  <InputField
    label={Label}
    variant="filled"
    size="small"
    type={Type ?? 'text'}
    name={Name}
    value={Value}
    error={Errors ? true : false}
    helperText={Errors ? Errors.message : ''}
    {...Register}
    {...rest}
  />
)

export default Input
