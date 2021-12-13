import React from 'react'
import { Typography } from '@mui/material'

const getVariant = (variant: string) => {
  switch (variant) {
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'h5':
      return 'h5'
    case 'h6':
      return 'h6'
    case 'p1':
      return 'subtitle1'
    case 'p2':
      return 'subtitle2'
    default:
      return 'subtitle1'
  }
}

interface IProps {
  children: React.ReactNode
  variant: string
  className?: string
  component?: any
  [x: string]: any
}

const Text: React.FC<IProps> = ({
  className,
  children,
  variant,
  component,
}) => {
  return (
    <Typography
      className={className}
      variant={getVariant(variant)}
      component={component}
    >
      {children}
    </Typography>
  )
}

export default Text
