import React from 'react'
import { Button as MuiButton } from '@mui/material'

interface Props {
  children: any
  secondary?: boolean
  [x: string]: any
}

const Button: React.FC<Props> = ({ children, secondary, ...rest }) => {
  return (
    <MuiButton variant={secondary ? 'text' : 'contained'} {...rest}>
      {children}
    </MuiButton>
  )
}

export default Button
