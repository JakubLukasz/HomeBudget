import React from 'react'
import { styled } from '@mui/styles'
import { Link as ReactLink } from 'react-router-dom'

const StyledLink = styled(ReactLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}))

interface Props {
  children: React.ReactNode
  to: string
  className?: string
}

const Link: React.FC<Props> = ({ className, to, children }) => {
  return (
    <StyledLink className={className} to={to}>
      {children}
    </StyledLink>
  )
}

export default Link
